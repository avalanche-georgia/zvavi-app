import type { supabase } from './client'

// Supabase keeps a signed-in session in `sb-<project>-auth-token` cookies (split into
// `.0`, `.1`, … when long). Visitors have no accounts, so they never have one.
const authCookiePattern = /(?:^|;\s*)sb-[^=;]+-auth-token(?:\.\d+)?=/

export const hasAuthCookie = () => authCookiePattern.test(document.cookie)

// The browser client, loaded on demand: public pages only need it for a signed-in
// team member, so supabase-js stays out of every visitor's bundle
export const loadSupabase = async (): Promise<typeof supabase> =>
  (await import('./client')).supabase
