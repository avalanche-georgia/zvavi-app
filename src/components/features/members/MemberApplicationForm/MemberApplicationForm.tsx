'use client'

import { useState } from 'react'
import { useToast, useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'src/i18n/navigation'

import ApplicationSuccess from './ApplicationSuccess'
import CharterAgreement from './CharterAgreement'
import FormFields from './FormFields'
import PaymentSection from './PaymentSection'
import type { MemberApplicationFormData } from './schema'
import { memberApplicationSchema } from './schema'
import type { SubmitResult } from './submitApplication'
import submitApplication from './submitApplication'

import { routes } from '@/routes'

const MemberApplicationForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<SubmitResult | null>(null)

  const form = useForm<MemberApplicationFormData>({
    defaultValues: {
      address: '',
      age: '',
      charterAgreed: undefined as unknown as true,
      email: '',
      firstName: '',
      gender: '',
      lastName: '',
      motivation: '',
      occupation: '',
      paymentMethod: undefined as unknown as MemberApplicationFormData['paymentMethod'],
      phone: '',
    },
    resolver: zodResolver(memberApplicationSchema),
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const onSubmit = async (data: MemberApplicationFormData) => {
    setIsSubmitting(true)

    try {
      const submitResult = await submitApplication(data)

      setResult(submitResult)
    } catch (error) {
      toastError('MemberApplicationForm', {
        error,
        message: t('joinUs.apply.messages.error'),
      })
    } finally {
      setIsSubmitting(false)
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
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormFields />
        <CharterAgreement />
        <PaymentSection />

        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={() => router.push(routes.about.joinUs)}
            type="button"
            variant="secondary"
          >
            {t('common.actions.cancel')}
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {t('common.actions.submit')}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default MemberApplicationForm
