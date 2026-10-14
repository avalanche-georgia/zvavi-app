'use client'

import { Menu, MenuItem } from '@ds/primitives'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { isNavItemActive } from './constants'

import { navItemClasses } from './navItemClasses'
import type { NavMenuGroup } from './types'
import useNavMenuItems from './useNavMenuItems'

const NavDropdown = ({ item }: { item: NavMenuGroup }) => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <Menu
      align="start"
      trigger={
        <button className={navItemClasses(isNavItemActive(item, pathname))} type="button">
          {t(item.titleId)}
          <ChevronDown aria-hidden className="text-muted size-3.5" />
        </button>
      }
    >
      {item.children.map((child) => (
        <MenuItem
          key={child.id}
          isActive={isNavItemActive(child, pathname)}
          render={<Link href={child.path} />}
        >
          {t(child.titleId)}
        </MenuItem>
      ))}
    </Menu>
  )
}

// Desktop row of links and dropdowns; the burger menu takes over on narrower screens
const DesktopNav = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const navMenuItems = useNavMenuItems()

  return (
    <nav className="ml-7 hidden items-center gap-0.5 xl:flex">
      {navMenuItems.map((item) => {
        if (item.children) return <NavDropdown key={item.id} item={item} />

        const isActive = isNavItemActive(item, pathname)

        return (
          <Link
            key={item.id}
            aria-current={isActive ? 'page' : undefined}
            className={navItemClasses(isActive)}
            href={item.path}
          >
            {t(item.titleId)}
          </Link>
        )
      })}
    </nav>
  )
}

export default DesktopNav
