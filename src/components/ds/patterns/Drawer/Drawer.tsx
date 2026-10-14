'use client'

import { Dialog } from '@base-ui/react/dialog'

import { cn } from '@/lib/utils'

export type DrawerSide = 'left' | 'top'

type DrawerProps = {
  // Must include a DrawerTitle (the drawer's accessible name)
  children: React.ReactNode
  className?: string
  // What the drawer holds, for screen readers
  description?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  side: DrawerSide
}

const sideClasses: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0 w-64 max-w-[85vw] data-ending-style:-translate-x-full data-starting-style:-translate-x-full',
  top: 'inset-x-0 top-0 max-h-dvh data-ending-style:-translate-y-full data-starting-style:-translate-y-full',
}

// Navigation panel that slides in from a screen edge (the mobile menus). The
// backdrop, Esc and DrawerClose close it. For content, use a Sheet.
const Drawer = ({ children, className, description, isOpen, onOpenChange, side }: DrawerProps) => (
  <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
    <Dialog.Portal>
      <Dialog.Backdrop className="bg-scrim fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <Dialog.Popup
        className={cn(
          'bg-surface text-ink shadow-menu fixed z-50 flex flex-col outline-hidden',
          'ease-sheet transition-transform duration-250 motion-reduce:transition-none',
          sideClasses[side],
          className,
        )}
      >
        {description && <Dialog.Description className="sr-only">{description}</Dialog.Description>}
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>
)

export default Drawer
