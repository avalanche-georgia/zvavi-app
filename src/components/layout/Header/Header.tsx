'use client'

import { useCallback } from 'react'
import Logo from '@assets/images/logo.png'
import { useAuth, useToast } from '@components/hooks'
import { LanguageToggle } from '@components/shared'
import { Button } from '@components/ui'
import { supabase } from '@data'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from 'src/i18n/navigation'

import { DesktopNav, MobileMenuButton } from './NavMenu'

import { routes } from '@/routes'

const Header = () => {
  const router = useRouter()
  const t = useTranslations()
  const { isAuthenticated } = useAuth()
  const { toastError } = useToast()

  const handleLogOutClick = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      router.push(routes.auth.login)
    } catch (error) {
      toastError('Header | handleLogOutClick', { error, message: 'Error logging out' })
    }
  }, [router, toastError])

  return (
    <header className="sticky inset-0 z-40 bg-white shadow-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3">
        <Link className="flex shrink-0 items-center gap-2" href="/">
          <Image alt="Logo" height={32} src={Logo} width={32} />
          <h1 className="text-xl font-semibold text-primary md:text-2xl">Avalanche.ge</h1>
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-4">
          <LanguageToggle />

          <MobileMenuButton />

          {isAuthenticated && (
            <Button onClick={handleLogOutClick}>{t('auth.logout.button')}</Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
