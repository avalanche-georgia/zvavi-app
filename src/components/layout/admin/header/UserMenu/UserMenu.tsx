'use client'

import { useAuth, useSignOut } from '@components/hooks'
import UserAvatar from '@components/shared/UserAvatar'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'
import { Button, Skeleton } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const UserMenu = () => {
  const t = useTranslations()
  const { isLoading: isAuthLoading, user } = useAuth()
  const { data: profile, isPending: isProfilePending } = useCurrentUserProfileQuery()
  const { signOut } = useSignOut()

  if (isAuthLoading || isProfilePending || !user) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="hidden h-3.5 w-24 md:block" />
        <Skeleton className="rounded-field h-10 w-20" />
      </div>
    )
  }

  const displayName = profile?.fullName || user.email || ''

  return (
    <div className="flex shrink-0 items-center gap-4">
      <Link
        className="rounded-control text-copy-sm text-body hover:text-ink flex items-center gap-2.5"
        href={routes.admin.profile}
      >
        <UserAvatar avatarUrl={profile?.avatarUrl} name={displayName} userId={user.id} />
        <span className="hidden max-w-40 truncate md:block">{displayName}</span>
      </Link>
      <Button onClick={() => void signOut()} size="sm" variant="secondary">
        {t('auth.logout.button')}
      </Button>
    </div>
  )
}

export default UserMenu
