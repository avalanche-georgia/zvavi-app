import { Icon } from '@components/icons'
import { CountBadge } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { NavItem } from './types'

import { cn } from '@/lib/utils'

type NavLinkProps = {
  badge?: number
  isActive?: boolean
  item: NavItem
  onClick?: VoidFunction
}

const NavLink = ({ badge, isActive = false, item, onClick }: NavLinkProps) => {
  const t = useTranslations()

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'rounded-control text-copy flex items-center gap-3 px-3 py-2 font-medium transition-colors',
        isActive ? 'bg-primary-soft text-primary-ink' : 'text-body hover:bg-tile hover:text-ink',
      )}
      href={item.href}
      onClick={onClick}
    >
      <Icon className="size-5 shrink-0" icon={item.icon} />
      {t(`admin.sidebar.${item.label}`)}
      <CountBadge className="ml-auto" count={badge} />
    </Link>
  )
}

export default NavLink
