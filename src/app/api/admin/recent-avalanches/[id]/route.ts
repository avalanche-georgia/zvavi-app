import { NextResponse } from 'next/server'

import { authorizeRecordRequest, type RecordRouteContext } from '../routeHelpers'

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
