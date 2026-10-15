'use client'

import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { isNavItemActive } from './constants'

import type { NavMenuLink } from './types'

import { cn } from '@/lib/utils'

type MobileNavLinkProps = {
  item: NavMenuLink
  onClose: () => void
}

const MobileNavLink = ({ item, onClose }: MobileNavLinkProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = isNavItemActive(item, pathname)

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'focus-ring text-copy-lg flex items-center gap-3 px-4 py-3',
        isActive ? 'text-ink font-semibold' : 'text-body',
      )}
      href={item.path}
      onClick={onClose}
    >
      <Icon className="text-muted size-5" icon={item.icon} />
      {t(item.titleId)}
    </Link>
  )
}

export default MobileNavLink
