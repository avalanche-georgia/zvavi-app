import { NextResponse } from 'next/server'

import { authorizeRequest, readJsonBody } from './routeHelpers'
import { createAvalancheSchema } from './schema'
import toAvalancheRow from './toAvalancheRow'

import writeWithPhotos from '@/api/observations/writeWithPhotos'

// Creates a team record and returns its id. A server route rather than a direct insert: new photos
// must be promoted to their permanent keys, and R2 credentials are server-only.
export const POST = async (request: Request) => {
  const { error: authError, supabase, userId } = await authorizeRequest()

  if (authError) return authError

  const parsed = createAvalancheSchema.safeParse(await readJsonBody(request))

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid request', ok: false }, { status: 400 })
  }

  const { photoKeys, regionId, ...fields } = parsed.data

  const result = await writeWithPhotos({
    failureMessage: 'failed to create avalanche',
    logLabel: 'POST /api/admin/recent-avalanches',
    pendingKeys: photoKeys,
    write: (promotedKeys) =>
      supabase
        .from('recent_avalanches')
        .insert({
          ...toAvalancheRow(fields),
          created_by_user_id: userId,
          photo_keys: promotedKeys,
          // NOT NULL columns, repeated so the insert type sees them set
          quantity: fields.quantity,
          region_id: regionId,
          size: fields.size,
          source: 'team',
          trigger: fields.trigger,
          type: fields.type,
        })
        .select('id')
        .single(),
  })

  if (!result.ok) return result.response

  return NextResponse.json({ id: result.written.data.id, ok: true })
}
