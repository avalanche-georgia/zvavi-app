'use client'

import { FormTextField } from '@ds/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useEmailUpdate } from './hooks'

import InlineFormActions from '../InlineFormActions'

const emailSchema = z.object({
  email: z.email({ error: () => ({ message: 'invalid_string' }) }),
})

type EmailFormSchema = z.infer<typeof emailSchema>

const EmailUpdateForm = ({ onClose }: { onClose: VoidFunction }) => {
  const t = useTranslations()
  const { updateEmail } = useEmailUpdate()

  const form = useForm<EmailFormSchema>({
    defaultValues: { email: '' },
    resolver: zodResolver(emailSchema),
  })

  const handleSubmit = async ({ email }: EmailFormSchema) => {
    if (await updateEmail(email)) onClose()
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <FormTextField<EmailFormSchema>
          autoComplete="email"
          className="@md:max-w-1/2"
          description={t('admin.profile.security.hints.emailChange')}
          label={t('admin.profile.security.labels.newEmail')}
          name="email"
          required
          type="email"
        />
        <InlineFormActions isSaving={form.formState.isSubmitting} onCancel={onClose} />
      </form>
    </FormProvider>
  )
}

export default EmailUpdateForm
