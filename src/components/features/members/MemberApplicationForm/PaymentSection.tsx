'use client'

import { FormRadioGroup } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import PaymentDetails from './PaymentDetails'
import type { MemberApplicationFormSchema as FormSchema, PaymentMethod } from './schema'
import { paymentMethods } from './schema'

const labelKeyByMethod: Record<PaymentMethod, string> = {
  bank_foreign: 'joinUs.apply.payment.bankTransferForeign',
  bank_gel: 'joinUs.apply.payment.bankTransferGEL',
  contact_me: 'joinUs.apply.payment.contactMe',
  wise: 'joinUs.apply.payment.wise',
}

// The fee, how to pay it, and the details for the chosen way
const PaymentSection = () => {
  const t = useTranslations()
  const selectedMethod = useWatch<FormSchema, 'paymentMethod'>({ name: 'paymentMethod' })

  const options = paymentMethods.map((method) => ({
    label: t(labelKeyByMethod[method]),
    value: method,
  }))

  return (
    <FormCard
      description={t('joinUs.apply.payment.amount')}
      title={t('joinUs.apply.payment.title')}
    >
      <FormRadioGroup<FormSchema, PaymentMethod>
        label={t('joinUs.apply.payment.method')}
        name="paymentMethod"
        options={options}
        required
        requiredMessage={t('joinUs.apply.payment.methodRequired')}
        requiredText={t('common.validation.required')}
      />
      <PaymentDetails method={selectedMethod} />
    </FormCard>
  )
}

export default PaymentSection
