// Checks the public bulletin API of a running deployment.
//
//   pnpm bulletin:check <baseUrl>        e.g. http://localhost:3000, https://avalanche.ge
//
// Validates the bulletins against the committed CAAML schema, checks every
// contract header, the 304 path and the regions GeoJSON, and looks for leaked
// personal data. Exits non-zero on any failure.
// For a protected Vercel preview, set VERCEL_AUTOMATION_BYPASS_SECRET.
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fs from 'node:fs'

const baseUrl = (process.argv[2] ?? '').replace(/\/$/, '')

if (!baseUrl) {
  console.error('Usage: pnpm bulletin:check <baseUrl>')
  process.exit(2)
}

const schema = JSON.parse(
  fs.readFileSync(new URL('../src/lib/caaml/schema/CAAMLv6_BulletinEAWS.json', import.meta.url), 'utf8'),
)
const ajv = new Ajv({ allErrors: true })

addFormats(ajv)

const validate = ajv.compile(schema)
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
const failures = []

const check = (condition, message) => {
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${message}`)
  if (!condition) failures.push(message)
}

const request = (path, headers = {}, method = 'GET') =>
  fetch(`${baseUrl}${path}`, {
    headers: { ...(bypassSecret ? { 'x-vercel-protection-bypass': bypassSecret } : {}), ...headers },
    method,
    redirect: 'manual',
  })

// Behind Vercel's CDN (x-vercel-cache present) the CDN consumes s-maxage and
// stale-while-revalidate and sends clients only `public, max-age=0`, and it
// weakens the ETag when it compresses the body. Both are checked explicitly.
const vercelClientCacheControl = 'public, max-age=0'

const checkHeaders = (response, expected, label) => {
  const vercelCache = response.headers.get('x-vercel-cache')
  const isCompressed = Boolean(response.headers.get('content-encoding'))

  if (vercelCache) {
    console.log(`INFO  ${label} served by Vercel CDN (x-vercel-cache: ${vercelCache}, age: ${response.headers.get('age')})`)
  }

  for (const [name, value] of Object.entries(expected)) {
    const actual = response.headers.get(name)
    const expectedValue = name === 'cache-control' && vercelCache ? vercelClientCacheControl : value

    check(actual === expectedValue, `${label} ${name}: ${JSON.stringify(actual)} (expected ${JSON.stringify(expectedValue)})`)
  }

  const etagPattern = vercelCache && isCompressed ? /^(W\/)?"[0-9a-f]{32}"$/ : /^"[0-9a-f]{32}"$/

  check(etagPattern.test(response.headers.get('etag') ?? ''), `${label} has a 32-hex ETag`)
}

const commonHeaders = {
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'ETag',
  'content-language': 'en',
  'x-content-type-options': 'nosniff',
}

const checkEndpoint = async ({ cacheControl, contentType, path }) => {
  const response = await request(path)
  const body = await response.text()

  check(response.status === 200, `${path} responds 200 (got ${response.status})`)
  checkHeaders(response, { ...commonHeaders, 'cache-control': cacheControl, 'content-type': contentType }, path)

  const etag = response.headers.get('etag')
  const notModified = await request(path, { 'If-None-Match': etag ?? '' })

  check(notModified.status === 304, `${path} If-None-Match → 304 (got ${notModified.status})`)
  check((await notModified.text()) === '', `${path} 304 has no body`)

  const head = await request(path, {}, 'HEAD')

  check(head.status === 200 && head.headers.get('etag') === etag, `${path} HEAD → 200 with the same ETag`)

  const options = await request(path, {}, 'OPTIONS')

  check(options.status === 204, `${path} OPTIONS → 204 (got ${options.status})`)
  check(
    options.headers.get('access-control-allow-methods') === 'GET, HEAD, OPTIONS',
    `${path} OPTIONS allows GET, HEAD, OPTIONS`,
  )

  // No personal data: forecaster names never leave the database
  check(!/forecaster/i.test(body), `${path} contains no "forecaster"`)
  check(!/[\w.+-]+@[\w-]+\.[\w.-]+/.test(body), `${path} contains no email-like string`)

  return body
}

const summarise = (collection, size) => {
  console.log(`\nbulletins: ${collection.bulletins.length}, body ${size} bytes`)

  for (const bulletin of collection.bulletins) {
    const { avalancheProblems = [], customData, regions = [], validTime } = bulletin

    console.log(
      `  ${regions.map((region) => region.regionID).join(',')}  ${validTime?.startTime} → ${validTime?.endTime}` +
        `  expired=${customData?.avalancheGeorgia?.expired}` +
        `  problems=${avalancheProblems.map((problem) => problem.problemType).join(',')}`,
    )
  }
}

const main = async () => {
  console.log(`Checking ${baseUrl}\n`)

  const bulletinsBody = await checkEndpoint({
    cacheControl: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
    contentType: 'application/json; charset=utf-8',
    path: '/api/v1/bulletins/latest',
  })
  const collection = JSON.parse(bulletinsBody)

  check(validate(collection), `bulletins validate against the CAAML schema ${JSON.stringify(validate.errors ?? [])}`)
  check(Array.isArray(collection.bulletins), 'body has a bulletins array')

  for (const bulletin of collection.bulletins ?? []) {
    check(Boolean(bulletin.bulletinID && bulletin.validTime?.startTime && bulletin.validTime?.endTime), `bulletin ${bulletin.bulletinID} has id and validity`)
    check(bulletin.dangerRatings?.length === 3, `bulletin ${bulletin.bulletinID} has three danger ratings`)
  }

  const regionsBody = await checkEndpoint({
    cacheControl: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    contentType: 'application/geo+json; charset=utf-8',
    path: '/api/v1/regions',
  })
  const regions = JSON.parse(regionsBody)

  check(regions.type === 'FeatureCollection', 'regions is a FeatureCollection')
  check(
    (regions.features ?? []).every((feature) => feature.geometry?.type === 'MultiPolygon' && feature.properties?.regionID),
    'every region feature is a MultiPolygon with a regionID',
  )

  summarise(collection, bulletinsBody.length)
  console.log(`regions: ${(regions.features ?? []).map((feature) => feature.properties.regionID).join(',')}, body ${regionsBody.length} bytes`)

  if (failures.length) {
    console.error(`\n${failures.length} check(s) failed`)
    process.exit(1)
  }

  console.log('\nAll checks passed')
}

main().catch((error) => {
  console.error('FAIL  request failed:', error.message)
  process.exit(1)
})
