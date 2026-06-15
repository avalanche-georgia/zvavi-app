import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { supabase } from '@data'
import { useTranslations } from 'next-intl'

type PasswordUpdatePayload = {
  currentPassword: string
  email: string
  newPassword: string
}

const usePasswordUpdate = () => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()

  const updatePassword = useCallback(
    async ({ currentPassword, email, newPassword }: PasswordUpdatePayload) => {
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password: currentPassword,
        })

        if (authError) {
          toastError('PasswordUpdateForm | reauthenticate', {
            error: authError,
            message: t('common.validation.invalidCredentials'),
          })

          return false
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) throw error

        toastSuccess(t('admin.profile.security.messages.passwordUpdated'))

        return true
      } catch (error) {
        toastError('PasswordUpdateForm | updatePassword', {
          error,
          message: error instanceof Error ? error.message : undefined,
        })

        return false
      }
    },
    [t, toastError, toastSuccess],
  )

  return { updatePassword }
}

export default usePasswordUpdate
