'use client'

import { Icon } from '@components/icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { navMenuItems } from './constants'

import type { NavMenuGroup, NavMenuLink } from './types'

const NavLink = ({ item }: { item: NavMenuLink }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = pathname === item.path

  return (
    <Link
      className={clsx(
        'px-3 py-2 text-sm font-medium transition-colors',
        'hover:text-primary',
        isActive ? 'text-primary' : 'text-gray-700',
      )}
      href={item.path}
    >
      {t(item.titleId)}
    </Link>
  )
}

const NavDropdown = ({ item }: { item: NavMenuGroup }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = item.children.some((child) => pathname === child.path)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={clsx(
          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium',
          'transition-colors duration-150',
          'hover:bg-gray-100 hover:text-primary focus:outline-none',
          'data-[state=open]:bg-gray-100 data-[state=open]:text-primary',
          isActive ? 'text-primary' : 'text-gray-700',
        )}
      >
        {t(item.titleId)}
        <Icon
          className="size-4 transition-transform duration-200 data-[state=open]:rotate-180"
          icon="chevronDown"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            'z-50 min-w-48 origin-top overflow-hidden rounded-xl p-1',
            'bg-white shadow-lg ring-1 ring-black/5',
            'data-[state=open]:animate-[fadeIn_150ms_ease-out,scaleIn_150ms_ease-out]',
            'data-[state=closed]:animate-[fadeOut_100ms_ease-in,scaleOut_100ms_ease-in]',
          )}
          sideOffset={8}
        >
          {item.children.map((child) => {
            const isChildActive = pathname === child.path

            return (
              <DropdownMenu.Item key={child.id} asChild>
                <Link
                  className={clsx(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none',
                    'transition-colors duration-150',
                    'hover:bg-gray-100 focus:bg-gray-100',
                    isChildActive ? 'text-primary' : 'text-gray-700',
                  )}
                  href={child.path}
                >
                  <Icon className="size-4" icon={child.icon} />
                  {t(child.titleId)}
                </Link>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const DesktopNav = () => (
  <nav className="hidden items-center gap-1 lg:flex">
    {navMenuItems.map((item) => {
      if (item.isHidden) return null

      if (item.children) {
        return <NavDropdown key={item.id} item={item} />
      }

      return <NavLink key={item.id} item={item} />
    })}
  </nav>
)

export default DesktopNav
