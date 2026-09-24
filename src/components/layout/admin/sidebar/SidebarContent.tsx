'use client'

import { Icon } from '@components'
import { usePendingMembersCount } from '@data/hooks/members'
import { usePendingObservationsCounts } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { navItems } from './constants'

import NavLink from './NavLink'
import type { NavItem } from './types'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type SidebarContentProps = {
  onItemClick?: () => void
}

const SidebarContent = ({ onItemClick }: SidebarContentProps) => {
  const pathname = usePathname()
  const t = useTranslations()
  const pendingMembersCount = usePendingMembersCount()
  const { total: pendingObservationsCount } = usePendingObservationsCounts()

  // Items waiting for an admin: member applications, observations to review
  const badges: Partial<Record<NavItem['label'], number>> = {
    members: pendingMembersCount,
    observations: pendingObservationsCount,
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="text-primary text-lg font-semibold" href={routes.admin.root}>
          {t('admin.title')}
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            badge={badges[item.label]}
            isActive={pathname.startsWith(item.href)}
            item={item}
            onClick={onItemClick}
          />
        ))}
      </nav>

      <div className="border-t p-3">
        <Link
          className={cn(
            'flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors',
            'text-gray-700 hover:bg-gray-100',
          )}
          href={routes.home}
        >
          <Icon className="size-5" icon="home" />
          {t('admin.sidebar.home')}
        </Link>
      </div>
    </div>
  )
}

export default SidebarContent
