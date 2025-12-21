'use client'

import { links } from '@components/constants'
import type { IconProps } from '@components/icons'
import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'

type ContactOption = {
  href: string
  icon: IconProps['icon']
  labelKey: string
  className?: string
}

// Order is important for display purposes
/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
const contactLinkOptions: Record<string, ContactOption> = {
  facebook: {
    className: 'fill-[#0866FF] size-6',
    href: links.facebook,
    icon: 'facebook',
    labelKey: 'contact.links.facebook',
  },
  instagram: {
    className: 'fill-[#FF0069] size-6',
    href: links.instagram,
    icon: 'instagram',
    labelKey: 'contact.links.instagram',
  },
  email: {
    href: `mailto:${links.email}`,
    icon: 'atSign',
    labelKey: 'contact.links.email',
  },
}
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

const ContactLinkList = () => {
  const t = useTranslations()

  return (
    <ul className="flex items-center gap-4">
      {Object.values(contactLinkOptions).map((option) => {
        const { className, href, icon, labelKey } = option

        return (
          <li key={icon}>
            <a aria-label={t(labelKey)} href={href} rel="noreferrer" target="_blank">
              <Icon className={className} icon={icon} size="lg" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default ContactLinkList
