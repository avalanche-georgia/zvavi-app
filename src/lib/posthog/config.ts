// First-party path PostHog requests go through (see src/proxy.ts), so ad blockers don't drop them
export const posthogProxyPath = '/zvx'

export const posthogProjectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || ''

export const posthogHosts = {
  api: 'eu.i.posthog.com',
  assets: 'eu-assets.i.posthog.com',
  ui: 'https://eu.posthog.com',
}

const adminPathPattern = /^\/((en|ka)\/)?admin(\/|$)/

export const isAdminPathname = (pathname: string) => adminPathPattern.test(pathname)

// Git commit of the build (set in next.config.ts from Vercel's VERCEL_GIT_COMMIT_SHA)
export const appRelease = process.env.NEXT_PUBLIC_APP_RELEASE || 'development'
