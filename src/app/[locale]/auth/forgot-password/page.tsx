'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@components/hooks'
import { Button, TextInput } from '@components/ui'
import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { Field, Fieldset, Label, Legend } from '@headlessui/react'
import { useLocale, useTranslations } from 'next-intl'

import { routes } from '@/routes'

const ForgotPasswordPage = () => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const locale = useLocale()

  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)

  const handleEmailChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => setEmail(target.value),
    [],
  )

  const handleSendResetLinkClick = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsPending(true)

      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/${locale}${routes.auth.setNewPassword}`,
        })

        handleSupabaseError(error)
        toastSuccess(t('auth.forgotPassword.messages.sentSuccessfully'))
      } catch (error) {
        toastError('ForgotPasswordPage | handleSendResetLinkClick', {
          error,
        })
      } finally {
        setIsPending(false)
      }
    },
    [email, locale, t, toastError, toastSuccess],
  )

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form className="w-full max-w-sm px-4" onSubmit={handleSendResetLinkClick}>
        <Fieldset className="space-y-6 rounded p-6 dark:text-white sm:p-10">
          <Legend className="text-center text-2xl font-semibold">
            {t('auth.forgotPassword.title')}
          </Legend>

          <Field>
            <Label className="text-sm/6">{t('common.labels.email')}</Label>
            <TextInput className="w-full" onChange={handleEmailChange} required type="email" />
          </Field>

          <Button className="w-full text-center" disabled={isPending} type="submit">
            <span className="w-full">{t('auth.forgotPassword.sendResetLink')}</span>
          </Button>
        </Fieldset>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
