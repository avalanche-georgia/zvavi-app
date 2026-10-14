import { useEffect, useState } from 'react'
import { useToast } from '@components/hooks'
import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

// The reset link signs the user in; without that session there is nothing to update
const useSetNewPassword = () => {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const { toastError, toastSuccess } = useToast()
  const [hasSession, setHasSession] = useState<boolean | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      setHasSession(Boolean(user) && !error)
    }

    void checkSession()
  }, [])

  const setNewPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser(
        { password },
        { emailRedirectTo: `${window.location.origin}/${locale}${routes.auth.login}` },
      )

      handleSupabaseError(error)
      toastSuccess(t('auth.setNewPassword.messages.resetSuccessfully'))
      setIsRedirecting(true)
      router.push(routes.admin.root)
    } catch (error) {
      toastError('useSetNewPassword', {
        error,
        message: error instanceof Error ? error.message : undefined,
      })
    }
  }

  return { hasSession, isRedirecting, setNewPassword }
}

export default useSetNewPassword
