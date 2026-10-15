import { useTranslations } from 'next-intl'

import SocialPlatformIcon from './SocialPlatformIcon'

import { parseSocialLinks, type SocialLink, socialPlatformNames } from '@/lib/socialLinks'

// "Instagram: @masha" — the chip shows only the handle, so screen readers get the platform too
const getLinkName = ({ label, platform }: SocialLink) =>
  platform === 'website' ? label : `${socialPlatformNames[platform]}: ${label}`

// A person's links as chips: platform logo + handle (or domain), new tab
const ProfileSocialLinks = ({ urls }: { urls: string[] }) => {
  const t = useTranslations()
  const links = parseSocialLinks(urls)

  if (links.length === 0) return null

  return (
    <ul aria-label={t('team.links.title')} className="flex flex-wrap gap-2">
      {links.map((link, index) => (
        // Index: the same link may be stored twice

        <li key={`${index}-${link.href}`}>
          <a
            aria-label={`${getLinkName(link)} (${t('common.labels.opensInNewTab')})`}
            className="focus-ring bg-tile hover:bg-tile-hover text-copy-sm text-ink inline-flex h-9 max-w-64 items-center gap-2 rounded-full px-3 leading-none font-medium transition-colors pointer-coarse:h-11"
            href={link.href}
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            <SocialPlatformIcon platform={link.platform} />
            <span className="truncate py-0.5">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default ProfileSocialLinks
