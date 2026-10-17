import { createHash } from 'node:crypto'

// Shared HTTP behaviour of the public API: CORS (open, `Authorization` reserved
// for future keys and ignored today), strong ETags, 304, HEAD and problem+json.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': 'ETag',
}

export const etagOf = (body: string) =>
  `"${createHash('sha256').update(body).digest('hex').slice(0, 32)}"`

const matchesEtag = (ifNoneMatch: string | null, etag: string) =>
  (ifNoneMatch ?? '')
    .split(',')
    .map((tag) => tag.trim().replace(/^W\//, ''))
    .some((tag) => tag === '*' || tag === etag)

type CachedResponseParams = {
  body: string
  cacheControl: string
  contentType: string
  request: Request
}

// 200 with the body (none for HEAD), or 304 with the same headers
export const cachedResponse = ({
  body,
  cacheControl,
  contentType,
  request,
}: CachedResponseParams) => {
  const etag = etagOf(body)
  const headers = {
    ...corsHeaders,
    'Cache-Control': cacheControl,
    'Content-Language': 'en',
    'Content-Type': contentType,
    ETag: etag,
    'X-Content-Type-Options': 'nosniff',
  }

  if (matchesEtag(request.headers.get('If-None-Match'), etag)) {
    return new Response(null, { headers, status: 304 })
  }

  return new Response(request.method === 'HEAD' ? null : body, { headers, status: 200 })
}

// Never cacheable: apps keep their last good data on 5xx
export const problemResponse = (request: Request, title: string) =>
  new Response(
    request.method === 'HEAD' ? null : JSON.stringify({ status: 500, title, type: 'about:blank' }),
    {
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-store',
        'Content-Type': 'application/problem+json',
        'X-Content-Type-Options': 'nosniff',
      },
      status: 500,
    },
  )

export const optionsResponse = () =>
  new Response(null, {
    headers: {
      ...corsHeaders,
      'Access-Control-Allow-Headers': 'Authorization, Content-Type, If-None-Match',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
    status: 204,
  })
