import type { AbstractIntlMessages } from 'next-intl'

type Scope = AbstractIntlMessages

const trimmedScopes = new Set(['admin', 'legal', 'seo'])

// The messages every page embeds for its client components. Left out: what only server
// components read (page metadata, the legal pages' text) and what only the admin area
// uses — the admin layout provides the full set again. Server components read every
// message regardless.
const pickPublicMessages = (messages: AbstractIntlMessages): AbstractIntlMessages => {
  const { admin, legal } = messages as Record<string, Scope>
  const { forecast, forecasts } = admin
  const { view } = forecasts as Scope
  const publicScopes = Object.fromEntries(
    Object.entries(messages).filter(([scope]) => !trimmedScopes.has(scope)),
  )

  return {
    ...publicScopes,
    // The forecast view (shared with the admin preview) labels problems with these
    admin: { forecast, forecasts: { view } },
    // The join-us form's consent checkbox
    legal: { consent: legal.consent },
  }
}

export default pickPublicMessages
