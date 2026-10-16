'use client'

import { useReportFormState } from '@components/features/admin/shared'
import { serverDateFormat } from '@domain/constants'
import { getMemberName } from '@domain/memberName'
import type { Member } from '@domain/types'
import { FormDateField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { zodResolver } from '@hookform/resolvers/zod'
import { addYears, format, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { type ApproveFormData, approveFormSchema } from './schema'
import useApproveSubmit from './useApproveSubmit'

type ApproveFormProps = {
  formId: string
  member: Member
  onDirtyChange: (isDirty: boolean) => void
  onSubmittingChange: (isSubmitting: boolean) => void
  onSuccess: VoidFunction
}

// A year from today, unless the admin picks other dates
const getDefaultValues = (): ApproveFormData => {
  const today = startOfDay(new Date())

  return { expiresAt: addYears(today, 1), joinedAt: today }
}

// Turns a pending application into an active membership
const ApproveForm = ({
  formId,
  member,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
}: ApproveFormProps) => {
  const t = useTranslations()
  const form = useForm<ApproveFormData>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(approveFormSchema),
  })
  const { isDirty, isSubmitting } = form.formState
  const joinedAt = useWatch({ control: form.control, name: 'joinedAt' })
  const { handleSubmit } = useApproveSubmit(member, onSuccess)

  useReportFormState({ isDirty, isSubmitting }, { onDirtyChange, onSubmittingChange })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        className="bg-canvas flex min-h-full flex-col gap-3 p-3 md:p-4"
        id={formId}
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormCard
          description={t('admin.members.approve.description', { name: getMemberName(member) })}
          title={t('admin.members.approve.title')}
        >
          <FormDateField<ApproveFormData>
            label={t('admin.members.form.labels.joinedAt')}
            max={format(new Date(), serverDateFormat)}
            name="joinedAt"
            required
          />
          <FormDateField<ApproveFormData>
            description={t('admin.members.form.hints.expiresAt')}
            label={t('admin.members.form.labels.expiresAt')}
            min={joinedAt ? format(joinedAt, serverDateFormat) : undefined}
            name="expiresAt"
          />
        </FormCard>
      </form>
    </FormProvider>
  )
}

export default ApproveForm
