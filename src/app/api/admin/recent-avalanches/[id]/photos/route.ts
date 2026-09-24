import { NextResponse } from 'next/server'

import { authorizeRecordRequest, type RecordRouteContext } from '../../routeHelpers'

import { signPhotoUrls } from '@/lib/r2'

// Signed photo URLs for one avalanche record, any status — admin only. Keys are
// read from the record itself, never taken from the request, so this can't be
// used to sign arbitrary objects in the bucket.
export const GET = async (_request: Request, context: RecordRouteContext) => {
  const { error: authError, id, supabase } = await authorizeRecordRequest(context)

  if (authError) return authError

  if (!process.env.R2_BUCKET_OBSERVATIONS) {
    return NextResponse.json({ error: 'photo storage not configured', ok: false }, { status: 503 })
  }

  const { data, error } = await supabase
    .from('recent_avalanches')
    .select('photo_keys')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[GET /api/admin/recent-avalanches/[id]/photos] select failed:', error.message)

    return NextResponse.json({ error: 'failed to fetch photos', ok: false }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'not found', ok: false }, { status: 404 })
  }

  try {
    const photoKeys = data.photo_keys ?? []
    const signedPhotos = await signPhotoUrls(photoKeys)
    const photos = photoKeys.flatMap((key) => signedPhotos.get(key) ?? [])

    return NextResponse.json({ ok: true, photos })
  } catch (signError) {
    console.error('[GET /api/admin/recent-avalanches/[id]/photos] signing failed:', signError)

    return NextResponse.json({ error: 'failed to sign photo URLs', ok: false }, { status: 500 })
  }
}
