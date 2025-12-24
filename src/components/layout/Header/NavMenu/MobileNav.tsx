'use client'

import { Icon } from '@components/icons'
import { Drawer } from 'vaul'

import { navMenuItems } from './constants'

import MobileNavAccordion from './MobileNavAccordion'
import MobileNavLink from './MobileNavLink'

type MobileNavProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => (
  <Drawer.Root direction="top" onOpenChange={(open) => !open && onClose()} open={isOpen}>
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-40 bg-black/20" />
      <Drawer.Content className="fixed inset-x-0 top-0 z-50 flex flex-col bg-white shadow-xl outline-none">
        <Drawer.Title asChild>
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-lg font-semibold text-primary">Menu</span>
            <button
              aria-label="Close menu"
              className="rounded-lg p-2 hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              <Icon className="size-6" icon="xMark" />
            </button>
          </div>
        </Drawer.Title>
        <Drawer.Description asChild>
          <nav className="max-h-[calc(100dvh-64px)] overflow-y-auto py-2">
            {navMenuItems.map((item) => {
              if (item.isHidden) return null

              if (item.children) {
                return <MobileNavAccordion key={item.id} item={item} onClose={onClose} />
              }

              return <MobileNavLink key={item.id} item={item} onClose={onClose} />
            })}
          </nav>
        </Drawer.Description>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
)

export default MobileNav
