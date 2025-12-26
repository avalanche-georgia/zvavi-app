'use client'

import { useState } from 'react'
import { Icon } from '@components/icons'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import type { NavMenuGroup } from './types'

type MobileNavAccordionProps = {
  item: NavMenuGroup
  onClose: () => void
}

const MobileNavAccordion = ({ item, onClose }: MobileNavAccordionProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = item.children.some((child) => pathname === child.path)
  const [isExpanded, setIsExpanded] = useState(isActive)

  return (
    <div>
      <button
        className={clsx(
          'flex w-full items-center justify-between px-4 py-3 text-base',
          isActive ? 'text-primary' : 'text-gray-700',
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <div className="flex items-center gap-3">
          <Icon className="size-5" icon={item.icon} />
          {t(item.titleId)}
        </div>
        <Icon
          className={clsx('size-5 transition-transform duration-200', isExpanded && 'rotate-180')}
          icon="chevronDown"
        />
      </button>

      <div
        className={clsx(
          'overflow-hidden transition-all duration-200',
          isExpanded ? 'max-h-96' : 'max-h-0',
        )}
      >
        <div className="bg-gray-50 py-1">
          {item.children.map((child) => {
            const isChildActive = pathname === child.path

            return (
              <Link
                key={child.id}
                className={clsx(
                  'flex items-center gap-3 py-2.5 pl-12 pr-4 text-sm',
                  isChildActive ? 'text-primary' : 'text-gray-600',
                )}
                href={child.path}
                onClick={onClose}
              >
                <Icon className="size-4" icon={child.icon} />
                {t(child.titleId)}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileNavAccordion
