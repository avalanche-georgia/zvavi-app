'use client'

import { Icon } from '@components/icons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import type { NavMenuLink } from './types'

type MobileNavLinkProps = {
  item: NavMenuLink
  onClose: () => void
}

const MobileNavLink = ({ item, onClose }: MobileNavLinkProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = pathname === item.path

  return (
    <Link
      className={clsx(
        'flex items-center gap-3 px-4 py-3 text-base',
        isActive ? 'text-primary' : 'text-gray-700',
      )}
      href={item.path}
      onClick={onClose}
    >
      <Icon className="size-5" icon={item.icon} />
      {t(item.titleId)}
    </Link>
  )
}

export default MobileNavLink
