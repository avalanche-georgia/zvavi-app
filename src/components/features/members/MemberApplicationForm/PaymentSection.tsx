'use client'

import { RadioGroup } from '@base-ui/react/radio-group'
import { RadioOption } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import PaymentDetails from './PaymentDetails'
import type { MemberApplicationFormData, PaymentMethod } from './schema'
import { paymentMethods } from './schema'

const PaymentSection = () => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
  } = useFormContext<MemberApplicationFormData>()
  const selectedMethod = useWatch({ control, name: 'paymentMethod' })

  const labelByMethod: Record<PaymentMethod, string> = {
    bank_foreign: t('joinUs.apply.payment.bankTransferForeign'),
    bank_gel: t('joinUs.apply.payment.bankTransferGEL'),
    contact_me: t('joinUs.apply.payment.contactMe'),
    wise: t('joinUs.apply.payment.wise'),
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{t('joinUs.apply.payment.title')}</h3>
      <p className="text-sm font-medium">{t('joinUs.apply.payment.amount')}</p>

      <Controller
        control={control}
        name="paymentMethod"
        render={({ field }) => (
          <RadioGroup
            className="flex flex-col gap-3"
            onValueChange={(value) => field.onChange(value)}
            value={field.value ?? ''}
          >
            {paymentMethods.map((method) => (
              <RadioOption key={method} label={labelByMethod[method]} value={method} />
            ))}
          </RadioGroup>
        )}
      />

      {errors.paymentMethod && (
        <span className="text-xs text-red-500">
          {t(`common.validation.${errors.paymentMethod.message}`)}
        </span>
      )}

      <PaymentDetails method={selectedMethod} />
    </div>
  )
}

export default PaymentSection
