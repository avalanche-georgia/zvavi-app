import { Icon } from '@components/icons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { NavItem } from './types'

type NavLinkProps = {
  badge?: number
  isActive?: boolean
  item: NavItem
  onClick?: () => void
}

const NavLink = ({ badge, isActive, item, onClick }: NavLinkProps) => {
  const t = useTranslations()

  return (
    <Link
      className={clsx(
        'flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors',
        isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100',
      )}
      href={item.href}
      onClick={onClick}
    >
      <Icon className="size-5" icon={item.icon} />
      {t(`admin.sidebar.${item.label}`)}
      {badge != null && badge > 0 && (
        <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
          {badge}
        </span>
      )}
    </Link>
  )
}

export default NavLink
