'use client'

import { Icon } from '@components/shared'
import { MenuItem as Item } from '@headlessui/react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import type { NavMenuItem } from './types'

const MenuItem = ({ item }: { item: NavMenuItem }) => {
  const { icon, path, titleId } = item
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <Item>
      {({ close }) => (
        <Link
          className={clsx('flex h-12 items-center px-4', {
            'bg-white/10 text-primary': isActive,
          })}
          href={path}
          onClick={close}
        >
          <div className="flex items-center gap-2">
            <Icon icon={icon} />
            <p>{t(titleId)}</p>
          </div>
        </Link>
      )}
    </Item>
  )
}

export default MenuItem
