'use client'

import { useCallback } from 'react'
import { useAuth, useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { LanguageToggle, RegionSelect } from '@components/shared'
import { supabase } from '@data'
import { useRegionContext } from '@domain/context/RegionContext'
import { Drawer, DrawerClose, DrawerTitle } from '@ds/patterns'
import { IconButton } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { getNavMenuItems } from './constants'

import MobileNavAccordion from './MobileNavAccordion'
import MobileNavLink from './MobileNavLink'

import { reportError } from '@/lib/observability'
import { routes } from '@/routes'

type MobileNavProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { toastError } = useToast()
  const { region } = useRegionContext()
  const navMenuItems = getNavMenuItems(region?.id ?? null)

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      onClose()
      router.push(routes.auth.login)
    } catch (error) {
      reportError(error, { scope: 'MobileNav | handleSignOut' })
      toastError('MobileNav | handleSignOut', { error, message: 'Error logging out' })
    }
  }, [onClose, router, toastError])

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  return (
    <Drawer
      description={t('navigation.menuDescription')}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      side="top"
    >
      <div className="border-rule flex items-center justify-between gap-2 border-b py-2 pr-2 pl-4">
        <DrawerTitle className="text-primary text-heading m-0 font-semibold">
          {t('navigation.menu')}
        </DrawerTitle>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <RegionSelect onSelect={onClose} />
          <DrawerClose render={<IconButton aria-label={t('navigation.closeMenu')} size="md" />}>
            <Icon className="size-6" icon="xMark" />
          </DrawerClose>
        </div>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto py-2">
        {navMenuItems.map((item) => {
          if (item.isHidden) return null

          if (item.children) {
            return <MobileNavAccordion key={item.id} item={item} onClose={onClose} />
          }

          return <MobileNavLink key={item.id} item={item} onClose={onClose} />
        })}

        {isAuthenticated && (
          <>
            <hr className="border-rule mx-4 my-2" />
            <button
              className="text-body flex w-full items-center gap-3 px-4 py-3 text-base"
              onClick={handleSignOut}
              type="button"
            >
              <Icon className="size-5" icon="logOut" />
              {t('auth.logout.button')}
            </button>
          </>
        )}
      </nav>
    </Drawer>
  )
}

export default MobileNav
