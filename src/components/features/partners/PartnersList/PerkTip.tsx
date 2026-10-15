'use client'

import { Popover } from '@base-ui/react/popover'
import { Gift } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PerkText from './PerkText'

import { cn } from '@/lib/utils'

type PerkTipSize = 'md' | 'sm'

type PerkTipProps = {
  benefit: string
  // Placement in the card
  className?: string
  size?: PerkTipSize
}

const sizeClasses: Record<PerkTipSize, string> = {
  md: 'size-8 pointer-coarse:after:-inset-1.5',
  sm: 'size-7 pointer-coarse:after:-inset-2',
}

const iconSizeClasses: Record<PerkTipSize, string> = {
  md: 'size-4',
  sm: 'size-3.5',
}

// A green gift on a partner card; the perk opens above it on hover, keyboard
// focus or tap. A popover rather than ds Tooltip so it works on touch too; its
// own component (not InfoTip) because the gift trigger and green tone only
// mean something for partners.
const PerkTip = ({ benefit, className, size = 'md' }: PerkTipProps) => {
  const t = useTranslations()

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={t('partners.page.perkLabel', { benefit })}
        className={cn(
          'focus-ring bg-success-soft text-success rounded-control grid place-items-center',
          'relative after:absolute',
          sizeClasses[size],
          className,
        )}
        closeDelay={100}
        delay={0}
        openOnHover
      >
        <Gift aria-hidden className={iconSizeClasses[size]} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          className="z-50"
          collisionPadding={16}
          side="top"
          sideOffset={8}
        >
          <Popover.Popup
            className={cn(
              'bg-success-soft text-success border-success/25 rounded-control text-copy-sm shadow-float max-w-60 border px-2.5 py-2 whitespace-pre-line outline-hidden',
              'transition-[opacity,translate] duration-120 data-ending-style:translate-y-0.5 data-ending-style:opacity-0 data-starting-style:translate-y-0.5 data-starting-style:opacity-0',
            )}
          >
            <Popover.Arrow
              className={cn(
                'bg-success-soft border-success/25 size-2 rotate-45',
                'data-[side=top]:-bottom-1.25 data-[side=top]:border-r data-[side=top]:border-b',
                'data-[side=bottom]:-top-1.25 data-[side=bottom]:border-t data-[side=bottom]:border-l',
              )}
            />
            <PerkText benefit={benefit} />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default PerkTip
