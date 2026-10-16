'use client'

import { LayoutDashboard, LogOut, UserRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

type MobileNavAccountProps = {
  onClose: () => void
  onSignOut: () => void
}

const iconClasses = 'text-muted size-5'
const rowClasses = 'focus-ring text-copy-lg text-body flex w-full items-center gap-3 px-4 py-3'

// The team's account rows: Admin panel, My profile, Sign out
const MobileNavAccount = ({ onClose, onSignOut }: MobileNavAccountProps) => {
  const t = useTranslations()

  return (
    <>
      <Link className={rowClasses} href={routes.admin.root} onClick={onClose}>
        <LayoutDashboard aria-hidden className={iconClasses} />
        {t('navigation.adminPanel')}
      </Link>
      <Link className={rowClasses} href={routes.admin.profile} onClick={onClose}>
        <UserRound aria-hidden className={iconClasses} />
        {t('navigation.profile')}
      </Link>
      <button className={rowClasses} onClick={onSignOut} type="button">
        <LogOut aria-hidden className={iconClasses} />
        {t('auth.logout.button')}
      </button>
    </>
  )
}

export default MobileNavAccount
