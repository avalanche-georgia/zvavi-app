'use client'

import { useCallback } from 'react'
import { useAuth, useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { supabase } from '@data'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'
import { Drawer } from 'vaul'

import { navMenuItems } from './constants'

import MobileNavAccordion from './MobileNavAccordion'
import MobileNavLink from './MobileNavLink'

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

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      onClose()
      router.push(routes.auth.login)
    } catch (error) {
      toastError('MobileNav | handleSignOut', { error, message: 'Error logging out' })
    }
  }, [onClose, router, toastError])

  return (
    <Drawer.Root direction="top" onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/20" />
        <Drawer.Content className="fixed inset-x-0 top-0 z-50 flex flex-col bg-white shadow-xl outline-none">
          <Drawer.Title asChild>
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-lg font-semibold text-primary">{t('navigation.menu')}</span>
              <button
                aria-label={t('navigation.closeMenu')}
                className="rounded-lg p-2 hover:bg-gray-100"
                onClick={onClose}
                type="button"
              >
                <Icon className="size-6" icon="xMark" />
              </button>
            </div>
          </Drawer.Title>
          <Drawer.Description className="sr-only">
            {t('navigation.menuDescription')}
          </Drawer.Description>
          <nav className="max-h-[calc(100dvh-64px)] overflow-y-auto py-2">
            {navMenuItems.map((item) => {
              if (item.isHidden) return null

              if (item.children) {
                return <MobileNavAccordion key={item.id} item={item} onClose={onClose} />
              }

              return <MobileNavLink key={item.id} item={item} onClose={onClose} />
            })}

            {isAuthenticated && (
              <>
                <hr className="mx-4 my-2" />
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-base text-gray-700"
                  onClick={handleSignOut}
                  type="button"
                >
                  <Icon className="size-5" icon="logOut" />
                  {t('auth.logout.button')}
                </button>
              </>
            )}
          </nav>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileNav
