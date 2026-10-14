'use client'

import { useSignOut } from '@components/hooks'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'
import type { User } from '@domain/types'
import { getButtonClasses, Menu, MenuItem, MenuSeparator, Skeleton } from '@ds/primitives'
import { LayoutDashboard, LogOut } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import AvatarButton from './AvatarButton'

import { routes } from '@/routes'

// Loaded only for signed-in users: the generated-avatar library stays out of every
// anonymous visitor's bundle
const UserAvatar = dynamic(() => import('@components/shared/UserAvatar'), {
  loading: () => <Skeleton className="size-9 rounded-full" />,
})

type AccountButtonProps = {
  isLoading: boolean
  user: User | null
}

// The profile photo (uploaded, else the generated one) opens the account menu, or "Sign in" when signed out
const AccountButton = ({ isLoading, user }: AccountButtonProps) => {
  const t = useTranslations()
  const { signOut } = useSignOut()
  const { data: profile, isPending: isProfilePending } = useCurrentUserProfileQuery({
    isEnabled: Boolean(user),
  })

  // Wait for the profile too: the generated avatar would flash before the uploaded photo
  if (isLoading || (user && isProfilePending)) {
    return <Skeleton className="size-9 rounded-full" />
  }

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
