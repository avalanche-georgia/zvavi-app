import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { supabase } from '@data'
import { useTranslations } from 'next-intl'

const useEmailUpdate = () => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()

  const updateEmail = useCallback(
    async (email: string) => {
      try {
        const { error } = await supabase.auth.updateUser({ email })

        if (error) throw error

        toastSuccess(t('admin.profile.security.messages.emailSent'))

        return true
      } catch (error) {
        toastError('EmailUpdateForm | updateEmail', {
          error,
          message: error instanceof Error ? error.message : undefined,
        })

        return false
      }
    },
    [t, toastError, toastSuccess],
  )

  return { updateEmail }
}

export default useEmailUpdate
