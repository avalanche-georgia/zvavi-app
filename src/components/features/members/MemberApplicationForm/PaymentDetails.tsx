'use client'

import { bankDetailsGEL, bankDetailsUSDEUR, links } from '@components/constants'
import { CopyField, CopyFieldGroup, NewTabLink } from '@components/shared'
import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { PaymentMethod } from './schema'

// Where to send the fee for the chosen payment method
const PaymentDetails = ({ method }: { method: PaymentMethod | undefined }) => {
  const t = useTranslations()

  if (method === 'bank_gel') {
    return (
      <CopyFieldGroup>
        <CopyField label={t('joinUs.apply.payment.bankName')} value={bankDetailsGEL.bankName} />
        <CopyField label={t('joinUs.apply.payment.account')} value={bankDetailsGEL.account} />
        <CopyField label={t('joinUs.apply.payment.beneficiary')} value={bankDetailsGEL.name} />
      </CopyFieldGroup>
    )
  }

  if (method === 'bank_foreign') {
    return (
      <CopyFieldGroup>
        <CopyField label={t('joinUs.apply.payment.beneficiary')} value={bankDetailsUSDEUR.name} />
        <CopyField label={t('joinUs.apply.payment.account')} value={bankDetailsUSDEUR.account} />
        <CopyField label={t('joinUs.apply.payment.bankName')} value={bankDetailsUSDEUR.bankName} />
        <CopyField label={t('joinUs.apply.payment.swiftCode')} value={bankDetailsUSDEUR.code} />
        <CopyField label={t('joinUs.apply.payment.address')} value={bankDetailsUSDEUR.address} />
      </CopyFieldGroup>
    )
  }

  if (method === 'wise') {
    return (
      <NewTabLink
        className={getButtonClasses({ className: 'self-start', size: 'sm', variant: 'secondary' })}
        hasIcon
        href={links.wise}
      >
        {t('joinUs.apply.payment.payWithWise')}
      </NewTabLink>
    )
  }

  return null
}

export default PaymentDetails
