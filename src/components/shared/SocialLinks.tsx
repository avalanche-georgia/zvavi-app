'use client'

import FacebookIcon from '@assets/icons/brand/facebook.svg'
import InstagramIcon from '@assets/icons/brand/instagram.svg'
import { links } from '@components/constants'
import { Tooltip } from '@ds/primitives'
import { AtSign } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Full-colour brand marks, as the platforms draw them — their own colours, not ours
const socialLinks = [
  {
    href: links.facebook,
    icon: <FacebookIcon aria-hidden className="size-7 fill-[#0866ff]" />,
    isMail: false,
    labelKey: 'contact.links.facebook',
  },
  {
    href: links.instagram,
    icon: (
      <span
        aria-hidden
        className="rounded-item grid size-7 place-items-center bg-linear-45 from-[#feda75] via-[#d62976] to-[#4f5bd5]"
      >
        <InstagramIcon className="size-4.5 fill-white" />
      </span>
    ),
    isMail: false,
    labelKey: 'contact.links.instagram',
  },
  {
    href: `mailto:${links.email}`,
    icon: (
      <span aria-hidden className="bg-ink grid size-7 place-items-center rounded-full">
        <AtSign className="size-4 text-white" strokeWidth={2.25} />
      </span>
    ),
    isMail: true,
    labelKey: 'contact.links.email',
  },
]

const SocialLinks = () => {
  const t = useTranslations()

  return (
    <ul aria-label={t('footer.social')} className="-ml-1.5 flex gap-2.5">
      {socialLinks.map(({ href, icon, isMail, labelKey }) => (
        <li key={labelKey}>
          <Tooltip label={t(labelKey)}>
            <a
              aria-label={
                isMail ? t(labelKey) : `${t(labelKey)} (${t('common.labels.opensInNewTab')})`
              }
              className="focus-ring rounded-control hover:bg-tile grid size-11 place-items-center transition-colors"
              href={href}
              rel={isMail ? undefined : 'noopener noreferrer'}
              // mailto opens the mail app — a new tab would stay empty
              target={isMail ? undefined : '_blank'}
            >
              {icon}
            </a>
          </Tooltip>
        </li>
      ))}
    </ul>
  )
}

export default SocialLinks
