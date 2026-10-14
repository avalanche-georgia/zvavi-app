import { useToast } from '@components/hooks'
import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { useLocale, useTranslations } from 'next-intl'

import { routes } from '@/routes'

const useSendResetLink = () => {
  const t = useTranslations()
  const locale = useLocale()
  const { toastError, toastSuccess } = useToast()

  const sendResetLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${locale}${routes.auth.setNewPassword}`,
      })

      handleSupabaseError(error)
      toastSuccess(t('auth.forgotPassword.messages.sentSuccessfully'))
    } catch (error) {
      toastError('useSendResetLink', {
        error,
        message: error instanceof Error ? error.message : undefined,
      })
    }
  }

  return { sendResetLink }
}

export default useSendResetLink
