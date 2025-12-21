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

import { NavMenu } from './NavMenu'

import { routes } from '@/routes'

const Header = () => {
  const router = useRouter()
  const t = useTranslations()
  const { isAuthenticated } = useAuth()
  const { toastError } = useToast()

  const handleLogOutClick = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      router.push(routes.login)
    } catch (error) {
      toastError('Header | handleLogOutClick', { error, message: 'Error logging out' })
    }
  }, [router, toastError])

  return (
    <header className="sticky inset-0 z-40 bg-white shadow-md">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between gap-2 p-4">
        <Link className="flex items-center gap-2" href="/">
          <Image alt="Logo" height={32} src={Logo} width={32} />
          <h1 className="text-2xl font-semibold text-primary">Avalanche.ge</h1>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageToggle />

          <NavMenu />

          {isAuthenticated && (
            <Button onClick={handleLogOutClick}>{t('auth.logout.button')}</Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
