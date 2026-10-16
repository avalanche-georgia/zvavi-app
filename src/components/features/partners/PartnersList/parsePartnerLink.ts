import { normalizeSocialUrl, parseSocialLink, socialPlatformNames } from '@/lib/socialLinks'

// A partner's link, safe to render: an https URL ("ozon.ge" and http:// are
// upgraded), named by the platform for a social page ("Instagram"), otherwise
// by its domain ("ozon.ge"). null when the stored URL isn't a usable link.
const parsePartnerLink = (url: string) => {
  const link = parseSocialLink(normalizeSocialUrl(url))

  if (!link) return null

  const label = link.platform === 'website' ? link.label : socialPlatformNames[link.platform]

  return { href: link.href, label }
}

export default parsePartnerLink
