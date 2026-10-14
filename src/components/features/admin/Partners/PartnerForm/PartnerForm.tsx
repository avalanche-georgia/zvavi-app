'use client'

import { useReportFormState } from '@components/features/admin/shared'
import { useUnsavedChangesWarning } from '@components/hooks'
import type { Partner, PartnerFormData } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { usePartnerFormSubmit } from './hooks'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import { partnerFormSchema } from './schema'

type PartnerFormProps = {
  // The host sheet renders Cancel / Save itself and submits the form by this id
  formId: string
  onDirtyChange: (isDirty: boolean) => void
  onSubmittingChange: (isSubmitting: boolean) => void
  onSuccess: VoidFunction
  // undefined when adding a partner
  partner?: Partner
}

const PartnerForm = ({
  formId,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
  partner,
}: PartnerFormProps) => {
  const form = useForm<PartnerFormData>({
    defaultValues: getInitialFormData(partner ?? null),
    resolver: zodResolver(partnerFormSchema),
  })
  const { isDirty, isSubmitting } = form.formState

  useUnsavedChangesWarning(isDirty)
  useReportFormState({ isDirty, isSubmitting }, { onDirtyChange, onSubmittingChange })

  const { handleSubmit } = usePartnerFormSubmit({ onSuccess, partnerId: partner?.id })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        className="bg-canvas @container flex min-h-full flex-col gap-3 p-3 md:p-4"
        id={formId}
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormFields />
      </form>
    </FormProvider>
  )
}

export default PartnerForm
