'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import type { Partner, PartnerFormData } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { usePartnerFormSubmit } from './hooks'

import FormFields from './FormFields'
import { partnerFormSchema } from './schema'

type PartnerFormProps = {
  initialFormData: PartnerFormData
  partner?: Partner
  onCancel: VoidFunction
  onSuccess: VoidFunction
}

const PartnerForm = ({ initialFormData, onCancel, onSuccess, partner }: PartnerFormProps) => {
  const t = useTranslations()

  const form = useForm<PartnerFormData>({
    defaultValues: initialFormData,
    resolver: zodResolver(partnerFormSchema),
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit } = usePartnerFormSubmit({ onSuccess, partnerId: partner?.id })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="rounded-lg bg-white shadow-sm">
        <section className="flex w-full flex-col gap-6 p-4 md:p-6">
          <h2 className="text-xl font-semibold">
            {partner ? t('admin.partners.title.edit') : t('admin.partners.title.create')}
          </h2>

          <form className="flex w-full flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormFields />
          </form>
        </section>

        <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
          <Button onClick={onCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>{t('common.actions.submit')}</Button>
        </footer>
      </div>
    </FormProvider>
  )
}

export default PartnerForm
