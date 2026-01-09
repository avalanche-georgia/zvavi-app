'use client'

import { Icon } from '@components/icons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { routes } from '@/routes'

type NavItem = {
  href: string
  icon: 'cloudSnow' | 'users'
  label: string
}

const navItems: NavItem[] = [
  { href: routes.admin.forecasts.root, icon: 'cloudSnow', label: 'forecasts' },
]

type NavLinkProps = {
  isActive: boolean
  item: NavItem
  onClick?: () => void
}

const NavLink = ({ isActive, item, onClick }: NavLinkProps) => {
  const t = useTranslations('admin.sidebar')

  return (
    <Link
      className={clsx(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100',
      )}
      href={item.href}
      onClick={onClick}
    >
      <Icon className="size-5" icon={item.icon} />
      {t(item.label)}
    </Link>
  )
}

type SidebarContentProps = {
  onItemClick?: () => void
}

const SidebarContent = ({ onItemClick }: SidebarContentProps) => {
  const pathname = usePathname()
  const t = useTranslations('admin')

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold text-primary">{t('title')}</h2>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            isActive={pathname.startsWith(item.href)}
            item={item}
            onClick={onItemClick}
          />
        ))}
      </nav>
    </div>
  )
}

export default SidebarContent
