'use client'

import { useCallback } from 'react'
import { useAuth } from '@components/hooks'
import { Button } from '@components/ui'
import { supabase } from '@data'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const UserMenu = () => {
  const router = useRouter()
  const t = useTranslations()
  const { user } = useAuth()

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push(routes.auth.login)
  }, [router])

  return (
    <div className="flex items-center gap-4">
      {user?.email && <span className="text-sm text-gray-600">{user.email}</span>}
      <Button onClick={handleSignOut}>{t('auth.logout.button')}</Button>
    </div>
  )
}

export default UserMenu
