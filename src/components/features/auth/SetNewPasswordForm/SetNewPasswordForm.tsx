'use client'

import { FormTextField } from '@ds/form'
import { Button } from '@ds/primitives'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import type { z } from 'zod'

import useSetNewPassword from './useSetNewPassword'
import AuthCard from '../AuthCard'
import { newPasswordSchema } from '../schemas'

type SetNewPasswordFormSchema = z.infer<typeof newPasswordSchema>

const defaultValues: SetNewPasswordFormSchema = { confirmPassword: '', password: '' }

const SetNewPasswordForm = () => {
  const t = useTranslations()
  const { hasSession, isRedirecting, setNewPassword } = useSetNewPassword()

  const form = useForm<SetNewPasswordFormSchema>({
    defaultValues,
    resolver: zodResolver(newPasswordSchema),
  })

  const handleSubmit = ({ password }: SetNewPasswordFormSchema) => setNewPassword(password)

  return (
    <AuthCard
      error={hasSession === false ? t('auth.errors.invalidSession') : undefined}
      title={t('auth.setNewPassword.title')}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...form}>
        <form className="flex flex-col gap-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <FormTextField<SetNewPasswordFormSchema>
            autoComplete="new-password"
            label={t('common.labels.newPassword')}
            name="password"
            required
            type="password"
          />
          <FormTextField<SetNewPasswordFormSchema>
            autoComplete="new-password"
            label={t('common.labels.confirmPassword')}
            name="confirmPassword"
            required
            type="password"
          />
          <Button
            className="w-full"
            disabled={!hasSession}
            isBusy={form.formState.isSubmitting || isRedirecting}
            type="submit"
          >
            {t('auth.setNewPassword.setPassword')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}

export default SetNewPasswordForm
