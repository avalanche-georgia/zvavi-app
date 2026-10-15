'use client'

import { useSignOut } from '@components/hooks'
import { Icon } from '@components/icons'
import { LanguageToggle, RegionSwitcher } from '@components/shared'
import { Drawer, DrawerClose, DrawerTitle } from '@ds/patterns'
import { IconButton } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import MobileNavAccordion from './MobileNavAccordion'
import MobileNavAccount from './MobileNavAccount'
import MobileNavLink from './MobileNavLink'
import useNavMenuItems from './useNavMenuItems'

type MobileNavProps = {
  isOpen: boolean
  isSignedIn: boolean
  onClose: () => void
}

// Burger menu: language and region on top, then the site links and (signed in) the account
const MobileNav = ({ isOpen, isSignedIn, onClose }: MobileNavProps) => {
  const t = useTranslations()
  const { signOut } = useSignOut()
  const navMenuItems = useNavMenuItems()

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  const handleSignOut = () => {
    onClose()
    void signOut()
  }

  return (
    <Drawer
      description={t('navigation.menuDescription')}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      side="top"
    >
      <div className="border-rule flex items-center justify-between gap-2 border-b py-2 pr-2 pl-4">
        <DrawerTitle className="text-heading m-0 font-semibold">{t('navigation.menu')}</DrawerTitle>
        <DrawerClose render={<IconButton aria-label={t('navigation.closeMenu')} size="md" />}>
          <Icon className="size-6" icon="xMark" />
        </DrawerClose>
      </div>
      <div className="border-rule flex flex-wrap items-center gap-2 border-b px-4 py-3">
        <LanguageToggle />
        <RegionSwitcher onNavigate={onClose} />
      </div>
      <nav aria-label={t('navigation.mainNav')} className="min-h-0 flex-1 overflow-y-auto py-2">
        {navMenuItems.map((item) =>
          item.children ? (
            <MobileNavAccordion key={item.id} item={item} onClose={onClose} />
          ) : (
            <MobileNavLink key={item.id} item={item} onClose={onClose} />
          ),
        )}
        {/* Visitors have no accounts: only the team gets the account rows */}
        {isSignedIn && (
          <>
            <hr className="border-rule mx-4 my-2" />
            <MobileNavAccount onClose={onClose} onSignOut={handleSignOut} />
          </>
        )}
      </nav>
    </Drawer>
  )
}

export default MobileNav
