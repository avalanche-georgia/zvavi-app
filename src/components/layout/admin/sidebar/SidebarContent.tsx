'use client'

import { usePendingMembersCount } from '@data/hooks/members'
import { usePendingObservationsSummary } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { designSystemItem, homeItem, navItems, teamItem } from './constants'

import NavLink from './NavLink'
import type { NavItem } from './types'

import { routes } from '@/routes'

const SidebarContent = ({ onItemClick }: { onItemClick?: VoidFunction }) => {
  const pathname = usePathname()
  const t = useTranslations()
  const pendingMembersCount = usePendingMembersCount()
  const { total: pendingObservationsCount } = usePendingObservationsSummary()

  // Items waiting for an admin: member applications, observations to review
  const badges: Partial<Record<NavItem['label'], number>> = {
    members: pendingMembersCount,
    observations: pendingObservationsCount,
  }

  // The dashboard is the admin root — every admin path starts with it
  const isItemActive = (href: string) =>
    href === routes.admin.root ? pathname === href : pathname.startsWith(href)

  return (
    <div className="flex h-full flex-col">
      <div className="border-rule flex h-14 shrink-0 items-center border-b px-4">
        <Link className="text-heading text-primary font-bold" href={routes.admin.root}>
          {t('admin.title')}
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            badge={badges[item.label]}
            isActive={isItemActive(item.href)}
            item={item}
            onClick={onItemClick}
          />
        ))}
      </nav>
      <div className="border-rule flex flex-col gap-1 border-t p-3">
        {designSystemItem && (
          <NavLink
            isActive={isItemActive(designSystemItem.href)}
            item={designSystemItem}
            onClick={onItemClick}
          />
        )}
        <NavLink isActive={isItemActive(teamItem.href)} item={teamItem} onClick={onItemClick} />
        <NavLink item={homeItem} onClick={onItemClick} />
      </div>
    </div>
  )
}

export default SidebarContent
