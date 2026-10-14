'use client'

import { useReportFormState } from '@components/features/admin/shared'
import { useUnsavedChangesWarning } from '@components/hooks'
import type { Member, MemberFormData } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { useMemberFormSubmit } from './hooks'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import { memberFormSchema } from './schema'

type MemberFormProps = {
  // The host sheet renders Cancel / Save itself and submits the form by this id
  formId: string
  // undefined when adding a member
  member?: Member
  onDirtyChange: (isDirty: boolean) => void
  onSubmittingChange: (isSubmitting: boolean) => void
  // Gets the new member after a create
  onSuccess: (createdMember?: Member) => void
}

const MemberForm = ({
  formId,
  member,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
}: MemberFormProps) => {
  const form = useForm<MemberFormData>({
    defaultValues: getInitialFormData(member ?? null),
    resolver: zodResolver(memberFormSchema),
  })
  const { isDirty, isSubmitting } = form.formState

  useUnsavedChangesWarning(isDirty)
  useReportFormState({ isDirty, isSubmitting }, { onDirtyChange, onSubmittingChange })

  const { handleSubmit } = useMemberFormSubmit({ memberId: member?.id, onSuccess })

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

export default MemberForm
