'use client'

import { Popover } from '@base-ui/react/popover'
import { Info } from 'lucide-react'

import { cn } from '@/lib/utils'

type InfoTipProps = {
  // Accessible name of the trigger, e.g. "About elevation zones"
  ariaLabel: string
  children: React.ReactNode
  className?: string
}

// A small ⓘ that explains something in a short popup. A popover rather than a
// tooltip: it opens on tap (phones) as well as on hover and keyboard focus.
const InfoTip = ({ ariaLabel, children, className }: InfoTipProps) => (
  <Popover.Root>
    <Popover.Trigger
      aria-label={ariaLabel}
      className={cn(
        'focus-ring text-muted hover:text-ink data-popup-open:text-ink relative inline-flex size-5 items-center justify-center rounded-full align-middle transition-colors',
        // 44px target around the small icon on touch screens only — with a mouse
        // an invisible margin makes the cursor flip to a pointer far from the icon
        'after:absolute pointer-coarse:after:-inset-3',
        className,
      )}
      closeDelay={100}
      delay={150}
      openOnHover
    >
      <Info aria-hidden className="size-4" />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Positioner className="z-50" collisionPadding={16} sideOffset={8}>
        <Popover.Popup className="rounded-control bg-ink text-copy-sm shadow-float max-w-72 px-3 py-2.5 text-white outline-hidden">
          {children}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
)

export default InfoTip
