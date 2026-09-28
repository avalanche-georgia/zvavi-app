import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { defaultLocale } from 'src/i18n/config'

import { routes } from '@/routes'

export async function updateSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, options, value }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const { pathname } = request.nextUrl
  // getClaims, not getUser: the project signs tokens with an asymmetric key, so
  // the JWT is verified locally against the cached public keys (and refreshed
  // when expired) — getUser asked the Auth server on every request, which
  // delayed every page by a full round trip to Supabase
  const { data } = await supabase.auth.getClaims()

  if (!data?.claims && pathname.includes('/admin')) {
    const loginUrl = new URL(`/${defaultLocale}${routes.auth.login}`, request.url)

    return NextResponse.redirect(loginUrl)
  }

  return response
}
