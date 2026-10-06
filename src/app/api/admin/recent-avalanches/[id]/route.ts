import { NextResponse } from 'next/server'

import updateWithPhotos from './updateWithPhotos'
import { authorizeRecordRequest, readJsonBody, type RecordRouteContext } from '../routeHelpers'
import { updateAvalancheSchema } from '../schema'
import toAvalancheRow from '../toAvalancheRow'

import { deleteStoredPhotos } from '@/api/observations/photoKeys'

// Deletes a record and its photos (originals + variants) — photos can only be
// removed server-side, with the R2 credentials
export const DELETE = async (_request: Request, context: RecordRouteContext) => {
  const { error: authError, id, supabase } = await authorizeRecordRequest(context)

  if (authError) return authError

  const { data, error } = await supabase
    .from('recent_avalanches')
    .delete()
    .eq('id', id)
    .select('photo_keys')

  if (error) {
    console.error('[DELETE /api/admin/recent-avalanches/[id]] delete failed:', error.message)

    return NextResponse.json({ error: 'failed to delete', ok: false }, { status: 500 })
  }

  if (data.length === 0) {
    return NextResponse.json({ error: 'not found', ok: false }, { status: 404 })
  }

  // After the row is gone: a failure here leaves orphaned files (logged), never
  // a record pointing at missing photos
  await deleteStoredPhotos(data[0].photo_keys ?? [])

  return NextResponse.json({ ok: true })
}

// Updates any subset of fields (a status toggle sends only `status`). A server
// route rather than a direct update: photo changes need the R2 credentials.
export const PATCH = async (request: Request, context: RecordRouteContext) => {
  const { error: authError, id, supabase } = await authorizeRecordRequest(context)

  if (authError) return authError

  const parsed = updateAvalancheSchema.safeParse(await readJsonBody(request))

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid request', ok: false }, { status: 400 })
  }

  const { photos, ...fields } = parsed.data
  const row = toAvalancheRow(fields)

  if (photos) return updateWithPhotos({ id, photos, row, supabase })

  const { data, error } = await supabase
    .from('recent_avalanches')
    .update(row)
    .eq('id', id)
    .select('id')

  if (error) {
    console.error('[PATCH /api/admin/recent-avalanches/[id]] update failed:', error.message)

    return NextResponse.json({ error: 'failed to update', ok: false }, { status: 500 })
  }

  if (data.length === 0)
    return NextResponse.json({ error: 'not found', ok: false }, { status: 404 })

  return NextResponse.json({ ok: true })
}
