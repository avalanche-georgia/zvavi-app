'use client'

import { Menu as BaseMenu } from '@base-ui/react/menu'

type MenuProps = {
  children: React.ReactNode
  // After the open / close animation ends (e.g. open a dialog once focus is back on the trigger)
  onOpenChangeComplete?: (isOpen: boolean) => void
  // Rendered as the trigger, e.g. an IconButton (keeps its own props and ref)
  trigger: React.ReactElement<Record<string, unknown>>
}

// Overflow menu anchored to its trigger. base-ui handles Esc, outside clicks,
// arrow-key navigation and returning focus to the trigger.
const Menu = ({ children, onOpenChangeComplete, trigger }: MenuProps) => (
  <BaseMenu.Root onOpenChangeComplete={onOpenChangeComplete}>
    <BaseMenu.Trigger render={trigger} />
    <BaseMenu.Portal>
      <BaseMenu.Positioner align="end" className="z-60" collisionPadding={16} sideOffset={6}>
        <BaseMenu.Popup className="rounded-media bg-surface shadow-menu border-rule w-57 border p-1.5 outline-hidden transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  </BaseMenu.Root>
)

export default Menu
