import { NextResponse } from 'next/server'

import type { UpdateAvalancheBody } from '../schema'

import { deleteStoredPhotos } from '@/api/observations/photoKeys'
import writeWithPhotos from '@/api/observations/writeWithPhotos'
import type { createClient } from '@/lib/supabase/server'
import type { TablesUpdate } from '@/lib/supabase/types'

type UpdateWithPhotosParams = {
  id: number
  photos: NonNullable<UpdateAvalancheBody['photos']>
  row: TablesUpdate<'recent_avalanches'>
  supabase: Awaited<ReturnType<typeof createClient>>
}

const logLabel = 'PATCH /api/admin/recent-avalanches/[id]'

// Saves an edit that changes the photo set: new uploads are promoted, the row
// gets kept + new keys, then removed photos are deleted from storage. Two
// admins editing photos at once: the last save wins.
const updateWithPhotos = async ({ id, photos, row, supabase }: UpdateWithPhotosParams) => {
  const { data: current, error } = await supabase
    .from('recent_avalanches')
    .select('photo_keys')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error(`[${logLabel}] select failed:`, error.message)

    return NextResponse.json({ error: 'failed to update', ok: false }, { status: 500 })
  }

  if (!current) return NextResponse.json({ error: 'not found', ok: false }, { status: 404 })

  const currentKeys = current.photo_keys ?? []

  // Only the record's own photos can be kept — never arbitrary bucket keys
  if (!photos.keep.every((key) => currentKeys.includes(key))) {
    return NextResponse.json({ error: 'invalid photos', ok: false }, { status: 400 })
  }

  const result = await writeWithPhotos({
    failureMessage: 'failed to update',
    logLabel,
    pendingKeys: photos.add,
    write: (promotedKeys) =>
      supabase
        .from('recent_avalanches')
        .update({ ...row, photo_keys: [...photos.keep, ...promotedKeys] })
        .eq('id', id)
        .select('id')
        .single(),
  })

  if (!result.ok) return result.response

  // After the row is saved: a failure here leaves orphaned files (logged),
  // never a record pointing at missing photos
  await deleteStoredPhotos(currentKeys.filter((key) => !photos.keep.includes(key)))

  return NextResponse.json({ ok: true })
}

export default updateWithPhotos
