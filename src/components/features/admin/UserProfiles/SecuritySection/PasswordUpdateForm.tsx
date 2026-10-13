'use client'

import { FormTextField } from '@ds/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { usePasswordUpdate } from './hooks'

import InlineFormActions from '../InlineFormActions'

const passwordSchema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z.string().min(1, { error: () => ({ message: 'required' }) }),
    password: z.string().min(8, { error: () => ({ message: 'passwordTooShort' }) }),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  })

type PasswordFormSchema = z.infer<typeof passwordSchema>

const defaultValues: PasswordFormSchema = { confirmPassword: '', currentPassword: '', password: '' }

type PasswordUpdateFormProps = {
  email: string
  onClose: VoidFunction
}

const PasswordUpdateForm = ({ email, onClose }: PasswordUpdateFormProps) => {
  const t = useTranslations()
  const { updatePassword } = usePasswordUpdate()

  const form = useForm<PasswordFormSchema>({
    defaultValues,
    resolver: zodResolver(passwordSchema),
  })

  const handleSubmit = async ({ currentPassword, password }: PasswordFormSchema) => {
    const isUpdated = await updatePassword({ currentPassword, email, newPassword: password })

    if (isUpdated) onClose()
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 @2xl:grid-cols-3">
          <FormTextField<PasswordFormSchema>
            autoComplete="current-password"
            label={t('admin.profile.security.labels.currentPassword')}
            name="currentPassword"
            required
            type="password"
          />
          <FormTextField<PasswordFormSchema>
            autoComplete="new-password"
            label={t('common.labels.newPassword')}
            name="password"
            required
            type="password"
          />
          <FormTextField<PasswordFormSchema>
            autoComplete="new-password"
            label={t('common.labels.confirmPassword')}
            name="confirmPassword"
            required
            type="password"
          />
        </div>
        <InlineFormActions isSaving={form.formState.isSubmitting} onCancel={onClose} />
      </form>
    </FormProvider>
  )
}

export default PasswordUpdateForm
