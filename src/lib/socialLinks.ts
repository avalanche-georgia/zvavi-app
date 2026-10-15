export type SocialPlatform =
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'website'
  | 'youtube'

export type SocialLink = {
  href: string
  // The handle ("@masha.tester", "mashat") or, for other sites, the domain
  label: string
  platform: SocialPlatform
}

export const maxSocialLinks = 5
// Same limit as the database check
export const maxSocialLinkLength = 300

// Brand names stay untranslated; other sites are named by their domain
export const socialPlatformNames: Record<Exclude<SocialPlatform, 'website'>, string> = {
  facebook: 'Facebook',
  github: 'GitHub',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
}

const platformsByHost: Record<string, Exclude<SocialPlatform, 'website'>> = {
  'facebook.com': 'facebook',
  'fb.com': 'facebook',
  'github.com': 'github',
  'instagram.com': 'instagram',
  'linkedin.com': 'linkedin',
  'youtu.be': 'youtube',
  'youtube.com': 'youtube',
}

// The path segment that holds the handle: linkedin.com/in/<name>, others /<name>
const getHandle = (platform: Exclude<SocialPlatform, 'website'>, segments: string[]) => {
  if (platform === 'linkedin') return segments[1] ?? segments[0]
  if (platform === 'instagram') return segments[0] && `@${segments[0]}`

  return segments[0]
}

const safeDecode = (segment: string) => {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

// "instagram.com/masha" → "https://instagram.com/masha", http:// is upgraded; any
// other explicit scheme is kept (and then refused by parseSocialLink)
export const normalizeSocialUrl = (input: string) => {
  const trimmed = input.trim().replace(/^http:\/\//i, 'https://')

  if (!trimmed || /^[a-z][a-z\d+.-]*:/i.test(trimmed)) return trimmed

  return `https://${trimmed}`
}

// Platform and a short label for a stored link; null for anything that isn't
// a plain https URL, so it is never rendered as a link
export const parseSocialLink = (url: string): SocialLink | null => {
  let parsed: URL

  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  if (parsed.protocol !== 'https:' || !parsed.hostname.includes('.')) return null

  const host = parsed.hostname.toLowerCase().replace(/^(www|m)\./, '')
  const platform = platformsByHost[host]

  if (!platform) return { href: parsed.href, label: host, platform: 'website' }

  const segments = parsed.pathname.split('/').filter(Boolean).map(safeDecode)

  return { href: parsed.href, label: getHandle(platform, segments) || host, platform }
}

// Stored links in order, skipping any that can't be shown
export const parseSocialLinks = (urls: string[]): SocialLink[] =>
  urls.flatMap((url) => parseSocialLink(url) ?? [])
