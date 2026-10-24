'use client'

import { Popover as BasePopover } from '@base-ui/react/popover'

export type PopoverAlign = 'center' | 'end' | 'start'

type PopoverProps = {
  align?: PopoverAlign
  // Accessible name of the popup (a dialog)
  ariaLabel: string
  children: React.ReactNode
  // What gets focus on open; by default the first focusable element. A calendar
  // passes its focusable day, so keyboard users land on the grid.
  initialFocus?: React.ComponentProps<typeof BasePopover.Popup>['initialFocus']
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  // The control that opens it, e.g. a filter Button
  trigger: React.ReactElement<Record<string, unknown>>
}

// Floating panel anchored to its trigger, for content that needs more room than
// a menu (a calendar, a small form). Esc and a click outside close it; focus
// returns to the trigger. Controlled when `isOpen` is passed.
const Popover = ({
  align = 'start',
  ariaLabel,
  children,
  initialFocus,
  isOpen,
  onOpenChange,
  trigger,
}: PopoverProps) => (
  <BasePopover.Root onOpenChange={onOpenChange} open={isOpen}>
    <BasePopover.Trigger render={trigger} />
    <BasePopover.Portal>
      <BasePopover.Positioner align={align} className="z-50" collisionPadding={16} sideOffset={6}>
        <BasePopover.Popup
          aria-label={ariaLabel}
          className="rounded-media border-rule bg-surface shadow-menu max-w-(--available-width) origin-(--transform-origin) border p-3 outline-hidden transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          initialFocus={initialFocus}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  </BasePopover.Root>
)

export default Popover
