'use client'

import { FormTextField } from '@ds/form'
import { Button } from '@ds/primitives'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'src/i18n/navigation'
import { z } from 'zod'

import useSendResetLink from './useSendResetLink'
import AuthCard from '../AuthCard'
import { emailField } from '../schemas'

import { routes } from '@/routes'

const forgotPasswordSchema = z.object({ email: emailField })

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>

const defaultValues: ForgotPasswordFormSchema = { email: '' }

const ForgotPasswordForm = () => {
  const t = useTranslations()
  const { sendResetLink } = useSendResetLink()

  const form = useForm<ForgotPasswordFormSchema>({
    defaultValues,
    resolver: zodResolver(forgotPasswordSchema),
  })

  const handleSubmit = ({ email }: ForgotPasswordFormSchema) => sendResetLink(email)

  return (
    <AuthCard title={t('auth.forgotPassword.title')}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...form}>
        <form className="flex flex-col gap-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <FormTextField<ForgotPasswordFormSchema>
            autoComplete="email"
            label={t('common.labels.email')}
            name="email"
            required
            type="email"
          />
          <Button className="w-full" isBusy={form.formState.isSubmitting} type="submit">
            {t('auth.forgotPassword.sendResetLink')}
          </Button>
          <Link
            className="text-copy-sm text-accent hover:text-accent-hover self-center"
            href={routes.auth.login}
          >
            {t('auth.login.title')}
          </Link>
        </form>
      </FormProvider>
    </AuthCard>
  )
}

export default ForgotPasswordForm
