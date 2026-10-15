'use client'

import { useState } from 'react'
import { useScrollToFirstError } from '@components/features/observations/form'
import { useToast, useUnsavedChangesWarning } from '@components/hooks'
import { HoneypotField } from '@components/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import AgreementsSection from './AgreementsSection'
import ApplicantSection from './ApplicantSection'
import ApplicationSuccess from './ApplicationSuccess'
import FormActions from './FormActions'
import { getInitialFormData } from './getInitialFormData'
import PaymentSection from './PaymentSection'
import type { MemberApplicationFormData, MemberApplicationFormSchema } from './schema'
import { memberApplicationSchema } from './schema'
import type { SubmitResult } from './submitApplication'
import submitApplication from './submitApplication'

import { reportError } from '@/lib/observability'

const MemberApplicationForm = () => {
  const t = useTranslations()
  const { toastError } = useToast()
  const [result, setResult] = useState<SubmitResult | null>(null)
  const { formRef, scrollToFirstError } = useScrollToFirstError()

  const form = useForm<MemberApplicationFormSchema, unknown, MemberApplicationFormData>({
    defaultValues: getInitialFormData(),
    resolver: zodResolver(memberApplicationSchema),
    // Focus + scroll on error is handled by useScrollToFirstError
    shouldFocusError: false,
  })

  useUnsavedChangesWarning(form.formState.isDirty && !result)

  const handleValid = async (data: MemberApplicationFormData) => {
    try {
      setResult(await submitApplication(data))
      window.scrollTo({ behavior: 'smooth', top: 0 })
    } catch (error) {
      reportError(error, { scope: 'MemberApplicationForm' })
      toastError('MemberApplicationForm', { error, message: t('joinUs.apply.messages.error') })
    }
  }

  if (result) {
    return (
      <ApplicationSuccess memberId={result.memberId} verificationCode={result.verificationCode} />
    )
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        ref={formRef}
        className="flex flex-col gap-3 lg:gap-4"
        noValidate
        onSubmit={form.handleSubmit(handleValid, scrollToFirstError)}
      >
        <HoneypotField />
        <ApplicantSection />
        <PaymentSection />
        <AgreementsSection />
        <FormActions />
      </form>
    </FormProvider>
  )
}

export default MemberApplicationForm
