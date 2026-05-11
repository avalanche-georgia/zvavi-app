'use client'

import { useCallback } from 'react'
import { useAuth, useDiceBearAvatar, useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button, Skeleton } from '@components/ui'
import { supabase } from '@data'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const UserMenu = () => {
  const router = useRouter()
  const t = useTranslations()
  const { isLoading: isAuthLoading, user } = useAuth()
  const { toastError } = useToast()
  const { data: profile, isPending: isProfilePending } = useCurrentUserProfileQuery()

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      router.push(routes.auth.login)
    } catch (error) {
      toastError('UserMenu | handleSignOut', { error })
    }
  }, [router, toastError])

  const { email: userEmail, id: userId } = user ?? {}

  const diceBearSrc = useDiceBearAvatar(userId ?? '')
  const displayName = profile?.fullName || userEmail
  const avatarSrc = profile?.avatarUrl ?? diceBearSrc

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget as HTMLImageElement

    img.src = diceBearSrc
  }

  if (isAuthLoading || isProfilePending) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <Skeleton className="hidden h-3.5 w-24 md:block" />
        </div>
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={routes.admin.profile}>
        <div className="flex items-center gap-2.5">
          <div className="size-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
            {avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={displayName ?? ''}
                className="size-full object-cover"
                onError={handleImageError}
                src={avatarSrc}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Icon className="size-4 text-gray-500" icon="user" />
              </div>
            )}
          </div>
          {displayName && (
            <span className="hidden max-w-40 truncate text-sm text-gray-700 md:block">
              {displayName}
            </span>
          )}
        </div>
      </Link>
      <Button onClick={handleSignOut}>{t('auth.logout.button')}</Button>
    </div>
  )
}

export default UserMenu
