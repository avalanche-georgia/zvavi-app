'use client'

import { useState } from 'react'
import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from 'src/i18n/navigation'

import { isNavItemActive } from './constants'

import type { NavMenuGroup } from './types'

import { cn } from '@/lib/utils'

type MobileNavAccordionProps = {
  item: NavMenuGroup
  onClose: () => void
}

const MobileNavAccordion = ({ item, onClose }: MobileNavAccordionProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActive = isNavItemActive(item, pathname)
  const [isExpanded, setIsExpanded] = useState(isActive)

  return (
    <div>
      <button
        aria-expanded={isExpanded}
        className={cn(
          'focus-ring text-copy-lg flex w-full items-center justify-between px-4 py-3',
          isActive ? 'text-accent font-semibold' : 'text-body',
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <span className="flex items-center gap-3">
          <Icon
            className={cn('size-5', isActive ? 'text-accent' : 'text-muted')}
            icon={item.icon}
          />
          {t(item.titleId)}
        </span>
        <Icon
          className={cn('text-muted size-5 transition-transform', isExpanded && 'rotate-180')}
          icon="chevronDown"
        />
      </button>

      {isExpanded && (
        <div className="bg-canvas py-1">
          {item.children.map((child) => {
            const isChildActive = isNavItemActive(child, pathname)

            return (
              <Link
                key={child.id}
                aria-current={isChildActive ? 'page' : undefined}
                className={cn(
                  'focus-ring text-copy flex items-center gap-3 py-2.5 pr-4 pl-12',
                  isChildActive ? 'bg-accent-soft text-accent font-semibold' : 'text-body',
                )}
                href={child.path}
                onClick={onClose}
              >
                <Icon
                  className={isChildActive ? 'text-accent' : 'text-muted'}
                  icon={child.icon}
                  size="sm"
                />
                {t(child.titleId)}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MobileNavAccordion
