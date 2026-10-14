'use client'

import { IconButton } from '@ds/primitives'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Drawer } from 'vaul'

import SidebarContent from './SidebarContent'

type MobileDrawerProps = {
  isOpen: boolean
  onClose: VoidFunction
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  const t = useTranslations()

  const handleOpenChange = (isNextOpen: boolean) => {
    if (!isNextOpen) onClose()
  }

  return (
    <Drawer.Root direction="left" onOpenChange={handleOpenChange} open={isOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-scrim fixed inset-0 z-40" />
        <Drawer.Content className="bg-surface shadow-menu fixed inset-y-0 left-0 z-50 w-64 outline-hidden">
          <Drawer.Title className="sr-only">{t('admin.sidebar.menu')}</Drawer.Title>
          <Drawer.Description className="sr-only">
            {t('admin.sidebar.menuDescription')}
          </Drawer.Description>
          <IconButton
            aria-label={t('admin.sidebar.closeMenu')}
            className="absolute top-2 right-2"
            onClick={onClose}
          >
            <X className="size-5" />
          </IconButton>
          <SidebarContent onItemClick={onClose} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileDrawer
