import { useCallback, useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { handleSupabaseError } from '@/data/helpers'
import { useToast } from '@/UI/hooks'

import { supabase } from '@/data'
import { routes } from '@/routes'

const validatePasswords = (password: string, passwordConfirm: string) => {
  return passwordConfirm === password
}

const useSetNewPassword = () => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastSuccess } = useToast()
  const locale = useLocale()

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handlePasswordChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setPassword(target.value),
    [],
  )

  const handlePasswordConfirmChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(target.value),
    [],
  )

  const handleValidatePasswords = useCallback(() => {
    if (!validatePasswords(password, passwordConfirm)) {
      setErrorMessage('Passwords do not match')
    } else {
      setErrorMessage('')
    }
  }, [password, passwordConfirm])

  const handleNewPasswordSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (errorMessage) return

      setIsPending(true)

      try {
        const { error } = await supabase.auth.updateUser(
          { password },
          { emailRedirectTo: `${window.location.origin}/${locale}${routes.login}` },
        )

        handleSupabaseError(error)

        toastSuccess(t('auth.forgotPassword.messages.sentSuccessfully'))
        setTimeout(() => {
          router.push(routes.admin)
          setIsPending(false)
        }, 3000)
      } catch (error) {
        if (error instanceof Error) {
          toastError('validatePasswords | handleNewPasswordSubmit', {
            error,
            message: error.message,
          })
          setIsPending(false)
        }
      }
    },
    [errorMessage, locale, password, router, t, toastError, toastSuccess],
  )

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (!user || error) {
        setErrorMessage(t('auth.errors.invalidSession'))
      }
    }

    checkAuth()
  }, [t])

  return {
    errorMessage,
    handleNewPasswordSubmit,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleValidatePasswords,
    isPending,
    password,
    passwordConfirm,
  }
}

export default useSetNewPassword
