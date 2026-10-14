'use client'

import { useSignOut } from '@components/hooks'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'
import type { User } from '@domain/types'
import { getButtonClasses, Menu, MenuItem, MenuSeparator, Skeleton } from '@ds/primitives'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import AvatarButton from './AvatarButton'
import UserAvatar from '../admin/header/UserMenu/UserAvatar'

import { routes } from '@/routes'

type AccountButtonProps = {
  isLoading: boolean
  user: User | null
}

// The profile photo (uploaded, else the generated one) opens the account menu, or "Sign in" when signed out
const AccountButton = ({ isLoading, user }: AccountButtonProps) => {
  const t = useTranslations()
  const { signOut } = useSignOut()
  const { data: profile } = useCurrentUserProfileQuery({ isEnabled: Boolean(user) })

  if (isLoading) return <Skeleton className="size-9 rounded-full" />

  if (!user) {
    return (
      <Link className={getButtonClasses({ size: 'sm', variant: 'text' })} href={routes.auth.login}>
        {t('auth.login.signIn')}
      </Link>
    )
  }

  const displayName = profile?.fullName || user.email || ''

  return (
    <Menu
      trigger={
        <AvatarButton label={t('navigation.account')}>
          <UserAvatar avatarUrl={profile?.avatarUrl} className="size-9" name="" userId={user.id} />
        </AvatarButton>
      }
    >
      <p className="text-caption text-muted truncate px-2.5 pt-1 pb-1.5">{displayName}</p>
      <MenuItem icon={<LayoutDashboard />} render={<Link href={routes.admin.root} />}>
        {t('navigation.adminPanel')}
      </MenuItem>
      <MenuSeparator />
      <MenuItem icon={<LogOut />} onClick={() => void signOut()}>
        {t('auth.logout.button')}
      </MenuItem>
    </Menu>
  )
}

export default AccountButton
