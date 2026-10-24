// The top-level sections under /{locale}/ that aren't regions. Any other first segment
// must be a region, so the proxy answers unknown ones with a real 404.
// Kept in sync with src/app/[locale] by appSections.test.ts.
const appSections = new Set([
  'about',
  'admin',
  'auth',
  'partners',
  'privacy-policy',
  'regions',
  'terms-of-service',
  'verify',
  'weather-stations',
])

export const isAppSection = (segment: string) => appSections.has(segment)

export default appSections
