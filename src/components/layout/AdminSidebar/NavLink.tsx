import { Icon } from '@components/icons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { NavItem } from './types'

type NavLinkProps = {
  isActive?: boolean
  item: NavItem
  onClick?: () => void
}

const NavLink = ({ isActive, item, onClick }: NavLinkProps) => {
  const t = useTranslations('admin.sidebar')

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
      {t(item.label)}
    </Link>
  )
}

export default NavLink
