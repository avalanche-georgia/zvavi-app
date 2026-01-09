'use client'

import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'
import { Drawer } from 'vaul'

import SidebarContent from './SidebarContent'

type MobileDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const t = useTranslations('admin')

  return (
    <Drawer.Root direction="left" onOpenChange={(o) => !o && onClose()} open={isOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/20" />
        <Drawer.Content className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl outline-none">
          <Drawer.Title className="sr-only">{t('sidebar.menu')}</Drawer.Title>
          <Drawer.Description className="sr-only">
            {t('sidebar.menuDescription')}
          </Drawer.Description>
          <div className="absolute right-2 top-2">
            <button
              aria-label={t('sidebar.closeMenu')}
              className="rounded-lg p-2 hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              <Icon className="size-5" icon="xMark" />
            </button>
          </div>
          <SidebarContent onItemClick={onClose} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileDrawer
