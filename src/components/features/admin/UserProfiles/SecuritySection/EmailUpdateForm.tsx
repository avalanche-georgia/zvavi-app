'use client'

import { Button, InputBlock, TextInput } from '@components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useEmailUpdate } from './hooks'

const emailSchema = z.object({
  email: z.email({ error: () => ({ message: 'invalid_string' }) }),
})

type EmailFormSchema = z.infer<typeof emailSchema>

const EmailUpdateForm = ({ onCancel }: { onCancel: VoidFunction }) => {
  const t = useTranslations()
  const { updateEmail } = useEmailUpdate()

  const form = useForm<EmailFormSchema>({
    defaultValues: { email: '' },
    resolver: zodResolver(emailSchema),
  })

  const {
    formState: { errors },
    register,
  } = form

  const handleSubmit = async (data: EmailFormSchema) => {
    const success = await updateEmail(data.email)

    if (success) onCancel()
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <InputBlock
          error={errors.email ? t(`common.validation.${errors.email.message}`) : undefined}
          label={t('admin.profile.security.labels.newEmail')}
          required
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <TextInput {...register('email')} type="email" />
        </InputBlock>
        <p className="text-xs text-gray-500">{t('admin.profile.security.hints.emailChange')}</p>
        <div className="ml-auto flex gap-3">
          <Button onClick={onCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.save')}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default EmailUpdateForm
