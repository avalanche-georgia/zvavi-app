import { defineRouting } from 'next-intl/routing'

import { defaultLocale, locales } from './config'

export const routing = defineRouting({
  // Pages set their own hreflang; the middleware's Link header pointed x-default at a redirect
  alternateLinks: false,
  defaultLocale,
  locales,
})
