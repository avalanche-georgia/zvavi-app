// Keeps secrets in URLs (member verification codes, Supabase auth codes/tokens) out of PostHog.
// Pure functions: used by the browser instances' before_send and by server-side error reports.

const redactedValue = 'redacted'

// /verify/<code> — the code is a bearer secret for a member's card
const tokenPathPattern = /(\/verify\/)[^/?#\s]+/g

// Supabase auth redirects (password reset, email change) put one-time codes/tokens here
const sensitiveQueryParams = [
  'access_token',
  'code',
  'error_description',
  'provider_token',
  'refresh_token',
  'token',
  'token_hash',
]

const placeholderOrigin = 'https://placeholder.invalid'

export const redactPathname = (pathname: string) =>
  pathname.replace(tokenPathPattern, `$1${redactedValue}`)

// Accepts an absolute http(s) URL or a site-relative path; anything else is returned unchanged
export const redactUrl = (value: string) => {
  const isRelative = value.startsWith('/')

  if (!isRelative && !/^https?:\/\//i.test(value)) return value

  let url: URL

  try {
    url = new URL(value, placeholderOrigin)
  } catch {
    return value
  }

  const pathname = redactPathname(url.pathname)
  const hasSensitiveParam = sensitiveQueryParams.some((param) => url.searchParams.has(param))
  // Auth redirects carry key=value pairs in the hash; plain #anchors are kept
  const hasHashParams = url.hash.includes('=')

  if (pathname === url.pathname && !hasSensitiveParam && !hasHashParams) return value

  url.pathname = pathname
  sensitiveQueryParams.forEach((param) => {
    if (url.searchParams.has(param)) url.searchParams.set(param, redactedValue)
  })
  if (hasHashParams) url.hash = ''

  return isRelative ? `${url.pathname}${url.search}${url.hash}` : url.toString()
}

const isUrlPropertyKey = (key: string) => /(url|referrer|pathname)$/i.test(key)

const redactProperties = (properties: Record<string, unknown> | undefined) => {
  if (!properties) return

  Object.entries(properties).forEach(([key, value]) => {
    if (typeof value === 'string' && isUrlPropertyKey(key)) {
      properties[key] = redactUrl(value)
    }
  })
}

type RedactableEvent = {
  $set?: Record<string, unknown>
  $set_once?: Record<string, unknown>
  properties: Record<string, unknown>
}

// Covers $current_url, $pathname, $referrer, $prev_pageview_*, $session_entry_*, $initial_* …
export const redactEventUrls = <T extends RedactableEvent>(event: T) => {
  redactProperties(event.properties)
  redactProperties(event.$set)
  redactProperties(event.$set_once)

  return event
}
