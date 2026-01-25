import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './i18n/config'

import { updateSession } from '@/lib/supabase/middleware'

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
      console.error('Failed to log suspicious request:', error.message)
    }
  } catch (err) {
    console.error('Error logging suspicious request:', err)
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

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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
