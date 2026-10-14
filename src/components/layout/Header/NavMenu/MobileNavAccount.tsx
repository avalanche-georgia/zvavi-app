'use client'

import { LayoutDashboard, LogIn, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

type MobileNavAccountProps = {
  isSignedIn: boolean
  onClose: () => void
  onSignOut: () => void
}

const iconClasses = 'text-muted size-5'
const rowClasses = 'focus-ring text-copy-lg text-body flex w-full items-center gap-3 px-4 py-3'

// Admin panel + Sign out, or Sign in
const MobileNavAccount = ({ isSignedIn, onClose, onSignOut }: MobileNavAccountProps) => {
  const t = useTranslations()

  if (!isSignedIn) {
    return (
      <Link className={rowClasses} href={routes.auth.login} onClick={onClose}>
        <LogIn aria-hidden className={iconClasses} />
        {t('auth.login.signIn')}
      </Link>
    )
  }

  return (
    <>
      <Link className={rowClasses} href={routes.admin.root} onClick={onClose}>
        <LayoutDashboard aria-hidden className={iconClasses} />
        {t('navigation.adminPanel')}
      </Link>
      <button className={rowClasses} onClick={onSignOut} type="button">
        <LogOut aria-hidden className={iconClasses} />
        {t('auth.logout.button')}
      </button>
    </>
  )
}

export default MobileNavAccount
