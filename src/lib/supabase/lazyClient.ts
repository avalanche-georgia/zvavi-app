import type { supabase } from './client'

// Supabase keeps a signed-in session in `sb-<project>-auth-token` cookies (split into
// `.0`, `.1`, … when long). Visitors have no accounts, so they never have one.
// Relies on those cookies being readable from JS (@supabase/ssr's default): marking them
// httpOnly would make every team member look signed out on public pages.
const authCookiePattern = /(?:^|;\s*)sb-[^=;]+-auth-token(?:\.\d+)?=/

export const hasAuthCookie = () => authCookiePattern.test(document.cookie)

// The browser client, loaded on demand: public pages only need it for a signed-in
// team member, so supabase-js stays out of every visitor's bundle
export const loadSupabase = async (): Promise<typeof supabase> =>
  (await import('./client')).supabase
