'use client'

import { FormTextField } from '@ds/form'
import { Button } from '@ds/primitives'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'src/i18n/navigation'
import { z } from 'zod'

import useSignIn from './useSignIn'
import AuthCard from '../AuthCard'
import { emailField, passwordField } from '../schemas'

import { routes } from '@/routes'

const loginSchema = z.object({ email: emailField, password: passwordField })

type LoginFormSchema = z.infer<typeof loginSchema>

const defaultValues: LoginFormSchema = { email: '', password: '' }

const LoginForm = () => {
  const t = useTranslations()
  const { isRedirecting, signIn } = useSignIn()

  const form = useForm<LoginFormSchema>({ defaultValues, resolver: zodResolver(loginSchema) })

  const handleSubmit = async (values: LoginFormSchema) => {
    const isSignedIn = await signIn(values)

    if (!isSignedIn) form.resetField('password')
  }

  return (
    <AuthCard title={t('auth.login.title')}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormProvider {...form}>
        <form className="flex flex-col gap-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <FormTextField<LoginFormSchema>
            autoComplete="email"
            label={t('common.labels.email')}
            name="email"
            required
            type="email"
          />
          <FormTextField<LoginFormSchema>
            autoComplete="current-password"
            label={t('common.labels.password')}
            name="password"
            required
            type="password"
          />
          <Link
            className="text-copy-sm text-accent hover:text-accent-hover self-end"
            href={routes.auth.forgotPassword}
          >
            {t('auth.login.forgotPassword')}
          </Link>
          <Button
            className="w-full"
            isBusy={form.formState.isSubmitting || isRedirecting}
            type="submit"
          >
            {t('auth.login.signIn')}
          </Button>
        </form>
      </FormProvider>
    </AuthCard>
  )
}

export default LoginForm
