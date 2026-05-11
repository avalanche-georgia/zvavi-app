'use client'

import { useCallback } from 'react'
import { useAuth, useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import { supabase } from '@data'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const UserMenu = () => {
  const router = useRouter()
  const t = useTranslations()
  const { user } = useAuth()
  const { toastError } = useToast()
  const { data: profile } = useCurrentUserProfileQuery()

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      router.push(routes.auth.login)
    } catch (error) {
      toastError('UserMenu | handleSignOut', { error })
    }
  }, [router, toastError])

  const { email: userEmail, id: userId } = user ?? {}

  const displayName = profile?.fullName || userEmail
  const avatarSrc =
    profile?.avatarUrl ??
    (userId ? `https://api.dicebear.com/9.x/open-peeps/svg?seed=${userId}` : null)

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!userId) return

    const img = e.currentTarget as HTMLImageElement

    img.src = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${userId}`
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
