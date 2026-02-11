'use client'

import { useState } from 'react'
import { useToast } from '@components/hooks'
import { Button } from '@components/ui'
import { convertCamelToSnake } from '@data/helpers'
import { supabase } from '@data/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'src/i18n/navigation'

import CharterAgreement from './CharterAgreement'
import FormFields from './FormFields'
import PaymentSection from './PaymentSection'
import type { MemberApplicationFormData } from './schema'
import { memberApplicationSchema } from './schema'

import { routes } from '@/routes'

const MemberApplicationForm = () => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastSuccess } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<MemberApplicationFormData>({
    defaultValues: {
      address: '',
      age: '',
      charterAgreed: undefined as unknown as true,
      email: '',
      fullName: '',
      gender: '',
      motivation: '',
      occupation: '',
      paymentMethod: undefined as unknown as MemberApplicationFormData['paymentMethod'],
      phone: '',
    },
    resolver: zodResolver(memberApplicationSchema),
  })

  const onSubmit = async (data: MemberApplicationFormData) => {
    setIsSubmitting(true)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { age, charterAgreed, gender, motivation, occupation, ...rest } = data
    const payload = convertCamelToSnake({
      ...rest,
      age: age ? Number(age) : null,
      gender: gender || null,
      motivation: motivation || null,
      occupation: occupation || null,
    })

    const { error } = await supabase.from('member_applications').insert(payload)

    setIsSubmitting(false)

    if (error) {
      toastError('MemberApplicationForm', {
        error,
        message: t('joinUs.apply.messages.error'),
      })

      return
    }

    toastSuccess(t('joinUs.apply.messages.success'))
    router.push(routes.about.joinUs)
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
