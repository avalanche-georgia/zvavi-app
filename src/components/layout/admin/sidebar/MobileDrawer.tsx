'use client'

import { Drawer, DrawerClose, DrawerTitle } from '@ds/patterns'
import { IconButton } from '@ds/primitives'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
    <Drawer
      description={t('admin.sidebar.menuDescription')}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      side="left"
    >
      <DrawerTitle className="sr-only">{t('admin.sidebar.menu')}</DrawerTitle>
      <DrawerClose
        className="absolute top-2 right-2"
        render={<IconButton aria-label={t('admin.sidebar.closeMenu')} />}
      >
        <X aria-hidden className="size-5" />
      </DrawerClose>
      <SidebarContent onItemClick={onClose} />
    </Drawer>
  )
}

export default MobileDrawer
