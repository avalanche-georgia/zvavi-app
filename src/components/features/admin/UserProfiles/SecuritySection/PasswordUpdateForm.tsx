'use client'

import { Button, InputBlock, TextInput } from '@components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { usePasswordUpdate } from './hooks'

const passwordSchema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z.string().min(1, { error: () => ({ message: 'required' }) }),
    password: z.string().min(8, { error: () => ({ message: 'passwordTooShort' }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  })

const defaultValues = { confirmPassword: '', currentPassword: '', password: '' }

type PasswordFormSchema = z.infer<typeof passwordSchema>

type PasswordUpdateFormProps = {
  email: string
  onCancel: VoidFunction
}

const PasswordUpdateForm = ({ email, onCancel }: PasswordUpdateFormProps) => {
  const t = useTranslations()
  const { updatePassword } = usePasswordUpdate()

  const form = useForm<PasswordFormSchema>({
    defaultValues,
    resolver: zodResolver(passwordSchema),
  })

  const {
    formState: { errors },
    register,
  } = form

  const handleSubmit = async (data: PasswordFormSchema) => {
    const success = await updatePassword({
      currentPassword: data.currentPassword,
      email,
      newPassword: data.password,
    })

    if (!success) return

    onCancel()
  }

  const getError = (field: keyof PasswordFormSchema) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputBlock
            error={getError('currentPassword')}
            label={t('admin.profile.security.labels.currentPassword')}
            required
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput {...register('currentPassword')} type="password" />
          </InputBlock>
          <InputBlock error={getError('password')} label={t('common.labels.newPassword')} required>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput {...register('password')} type="password" />
          </InputBlock>
          <InputBlock
            error={getError('confirmPassword')}
            label={t('common.labels.confirmPassword')}
            required
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput {...register('confirmPassword')} type="password" />
          </InputBlock>
        </div>
        <div className="ml-auto flex gap-3">
          <Button onClick={onCancel} type="button" variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.save')}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default PasswordUpdateForm
