'use client'

import { bankDetailsGEL, bankDetailsUSDEUR, links } from '@components/constants'
import { CopyField } from '@components/shared'
import { useTranslations } from 'next-intl'

import type { PaymentMethod } from './schema'

const PaymentDetails = ({ method }: { method: PaymentMethod | undefined }) => {
  const t = useTranslations()

  if (method === 'bank_gel') {
    return (
      <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-4">
        <CopyField label={t('joinUs.apply.payment.beneficiary')} value={bankDetailsGEL.name} />
        <CopyField label={t('joinUs.apply.payment.account')} value={bankDetailsGEL.account} />
      </div>
    )
  }

  if (method === 'bank_foreign') {
    return (
      <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-4">
        <CopyField label={t('joinUs.apply.payment.beneficiary')} value={bankDetailsUSDEUR.name} />
        <CopyField label={t('joinUs.apply.payment.account')} value={bankDetailsUSDEUR.account} />
        <CopyField label={t('joinUs.apply.payment.bankName')} value={bankDetailsUSDEUR.bankName} />
        <CopyField label={t('joinUs.apply.payment.swiftCode')} value={bankDetailsUSDEUR.code} />
        <CopyField label={t('joinUs.apply.payment.address')} value={bankDetailsUSDEUR.address} />
      </div>
    )
  }

  if (method === 'wise') {
    return (
      <a
        className="text-sm text-primary underline"
        href={links.wise}
        rel="noreferrer"
        target="_blank"
      >
        {links.wise}
      </a>
    )
  }

  return null
}

export default PaymentDetails
