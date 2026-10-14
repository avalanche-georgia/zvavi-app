import { allRegionIds, regionLocalStorageKey } from '@domain/constants'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './i18n/config'

import { posthogHosts, posthogProxyPath } from '@/lib/posthog/config'
import { reportServerError } from '@/lib/posthog/server'
import { updateSession } from '@/lib/supabase/middleware'

const knownRegions = new Set<string>(allRegionIds)

// Active regions, kept per server instance for as long as fetchActiveRegions caches them
const activeRegionsTtlMs = 600 * 1000
let activeRegionsCache: { expiresAt: number; ids: Set<string> } | null = null

// The anon REST endpoint: the proxy can't use the cookie-bound server client.
// null: the lookup failed.
const getActiveRegionIds = async (): Promise<Set<string> | null> => {
  if (activeRegionsCache && activeRegionsCache.expiresAt > Date.now()) {
    return activeRegionsCache.ids
  }

  try {
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/regions?select=id&is_active=eq.true`,
      { headers: { apikey: anonKey, authorization: `Bearer ${anonKey}` } },
    )

    if (!response.ok) throw new Error(`regions lookup failed: ${response.status}`)

    const rows = (await response.json()) as { id: string }[]
    const ids = new Set(rows.map(({ id }) => id))

    activeRegionsCache = { expiresAt: Date.now() + activeRegionsTtlMs, ids }

    return ids
  } catch (error) {
    reportServerError(error, { scope: 'proxy | getActiveRegionIds' })

    return null
  }
}

type RegionTarget = {
  // The cookie names a region that isn't active (or doesn't exist) — drop it
  isCookieStale: boolean
  // null: there is a choice to make → the region chooser
  regionId: string | null
}

// The one place that decides which region an entry request lands on:
// 1. the remembered region, if still active
// 2. else the only active region
// 3. else none (the region chooser)
// When the lookup fails, a remembered known region is trusted and nothing is guessed.
const resolveRegionTarget = async (request: NextRequest): Promise<RegionTarget> => {
  const cookieRegion = request.cookies.get(regionLocalStorageKey)?.value ?? null
  const activeIds = await getActiveRegionIds()

  if (!activeIds) {
    const isKnown = cookieRegion !== null && knownRegions.has(cookieRegion)

    return { isCookieStale: false, regionId: isKnown ? cookieRegion : null }
  }

  const isCookieActive = cookieRegion !== null && activeIds.has(cookieRegion)
  const onlyRegion = activeIds.size === 1 ? [...activeIds][0] : null

  return {
    isCookieStale: cookieRegion !== null && !isCookieActive,
    regionId: isCookieActive ? cookieRegion : onlyRegion,
  }
}

// A redirect whose target depends on the visitor (cookie) and on which regions are
// active: temporary (307), never stored by a shared cache
const regionRedirect = async (
  request: NextRequest,
  toRegionPath: (regionId: string) => string,
  locale: string,
) => {
  const { isCookieStale, regionId } = await resolveRegionTarget(request)
  const path = regionId ? `/${locale}${toRegionPath(regionId)}` : `/${locale}/regions`
  const response = NextResponse.redirect(new URL(path, request.url), 307)

  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('Vary', 'Cookie')

  if (isCookieStale) response.cookies.delete(regionLocalStorageKey)

  return response
}

const toRegionHome = (regionId: string) => `/${regionId}`

// Log suspicious requests to old forecast URL formats (non-integer IDs)
const logSuspiciousRequest = async (request: NextRequest) => {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } },
    )

    const { error } = await supabase.from('suspicious_requests').insert({
      city: request.headers.get('x-vercel-ip-city') || null,
      country: request.headers.get('x-vercel-ip-country') || null,
      ip_address: request.headers.get('x-forwarded-for')?.split(',')[0] || null,
      path: request.nextUrl.pathname,
      referer: request.headers.get('referer') || null,
      user_agent: request.headers.get('user-agent') || null,
    })

    if (error) {
      reportServerError(new Error(error.message), {
        scope: 'proxy | logSuspiciousRequest',
      })
    }
  } catch (error) {
    reportServerError(error, { scope: 'proxy | logSuspiciousRequest' })
  }
}

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
})

// Files that must stay at the root and should not be locale-prefixed
const publicRootFiles = [
  'apple-icon.png',
  'favicon.ico',
  'icon.png',
  'manifest.json',
  'opengraph-image',
  'robots.txt',
  'sitemap.xml',
  'twitter-image',
]

const publicRootFilesSet = new Set(publicRootFiles.map((f) => `/${f}`))

// Regex to detect the old forecast URL format: /forecasts/Gudauri_*
// Matches: /en/forecasts/Gudauri_2024-03-27T08%3A00_MG%09
// Does NOT match: /en/forecasts/123, /en/forecasts/current, /en/forecasts/history
const oldForecastPattern = /^\/(en|ka)\/forecasts\/Gudauri_.*$/

const isPosthogProxyPath = (pathname: string) =>
  pathname === posthogProxyPath || pathname.startsWith(`${posthogProxyPath}/`)

// Forward analytics requests to PostHog without the site's cookies (Supabase session) or auth header
const rewriteToPosthog = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl
  const upstreamPath = pathname.slice(posthogProxyPath.length) || '/'
  const isAsset = upstreamPath.startsWith('/static/') || upstreamPath.startsWith('/array/')
  const host = isAsset ? posthogHosts.assets : posthogHosts.api

  const headers = new Headers(request.headers)

  headers.delete('cookie')
  headers.delete('authorization')
  headers.set('host', host)

  return NextResponse.rewrite(new URL(`https://${host}${upstreamPath}${search}`), {
    request: { headers },
  })
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPosthogProxyPath(pathname)) {
    return rewriteToPosthog(request)
  }

  // next.config sets skipTrailingSlashRedirect (PostHog needs trailing slashes),
  // so the default trailing-slash redirect is done here for every other path
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = new URL(request.url)

    url.pathname = pathname.replace(/\/+$/, '') || '/'

    return NextResponse.redirect(url, 308)
  }

  // Log suspicious requests to old forecast URL formats
  if (oldForecastPattern.test(pathname)) {
    await logSuspiciousRequest(request)
  }

  // If someone requests a locale-prefixed metadata file, redirect to the root one
  const localePattern = locales.join('|')
  const filesPattern = publicRootFiles.map((f) => f.replace('.', '\\.')).join('|')
  const localeFileRegex = new RegExp(`^\\/(${localePattern})\\/(${filesPattern})$`)
  const localeFileMatch = pathname.match(localeFileRegex)

  if (localeFileMatch) {
    return NextResponse.redirect(new URL(`/${localeFileMatch[2]}`, request.url))
  }

  // Entry URLs ("/" and "/{locale}" have no page): one hop straight to the final page.
  // Bare "/" takes the locale from next-intl's cookie — never Accept-Language, so
  // crawlers always get one consistent answer.
  if (pathname === '/') {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    const locale = locales.find((supported) => supported === cookieLocale) ?? defaultLocale

    return regionRedirect(request, toRegionHome, locale)
  }

  const entryLocale = locales.find((locale) => pathname === `/${locale}`)

  if (entryLocale) return regionRedirect(request, toRegionHome, entryLocale)

  // Skip Next.js internals, API routes and root public metadata files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    publicRootFilesSet.has(pathname)
  ) {
    return NextResponse.next()
  }

  // Check if the locale is valid
  const localeMatched = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (!localeMatched) {
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url)

    return NextResponse.redirect(redirectUrl)
  }

  // Redirect bare /[locale]/forecasts(/...) to region-scoped URL
  const bareForecastsRegex = new RegExp(`^/(${localePattern})/forecasts(/.*)?$`)
  const bareForecastsMatch = pathname.match(bareForecastsRegex)

  if (bareForecastsMatch) {
    const locale = bareForecastsMatch[1]
    const rest = bareForecastsMatch[2] ?? ''

    return regionRedirect(request, (regionId) => `/${regionId}/forecasts${rest}`, locale)
  }

  // The region chooser with nothing to choose: straight to the only region (temporary —
  // it changes when another region opens). The page itself never redirects.
  const regionsPageMatch = pathname.match(new RegExp(`^/(${localePattern})/regions$`))

  if (regionsPageMatch) {
    const activeIds = await getActiveRegionIds()

    if (activeIds?.size === 1) {
      return regionRedirect(request, toRegionHome, regionsPageMatch[1])
    }
  }

  // A region that exists but is inactive: a real 404 status for crawlers. The [region]
  // layout renders the not-found screen, but the public loading boundary would stream
  // it with a 200.
  const regionSegment = pathname.split('/')[2]

  if (regionSegment && knownRegions.has(regionSegment)) {
    const activeIds = await getActiveRegionIds()

    if (activeIds && !activeIds.has(regionSegment)) {
      return NextResponse.rewrite(request.nextUrl, { status: 404 })
    }
  }

  // Update the request locale
  const intlResponse = intlMiddleware(request)

  if (intlResponse) {
    intlResponse.headers.set('x-locale-verified', 'true')
  }

  const response = intlResponse || NextResponse.next()

  return updateSession(request, response)
}

export const config = {
  matcher: ['/', '/:locale(en|ka)?/:path*'],
}
