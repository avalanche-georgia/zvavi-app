import { bankDetailsGEL, bankDetailsUSDEUR } from '@components/constants'
import { CopyField } from '@components/shared'
import { ContentCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import BankAccountGroup from './BankAccountGroup'

import { sectionIds } from '@/routes'

// GEL and USD / EUR accounts, each value copyable
const BankRequisitesSection = () => {
  const t = useTranslations()

  return (
    <ContentCard id={sectionIds.bank} title={t('contact.bank.title')}>
      <p>{t('contact.bank.description')}</p>
      <BankAccountGroup title={t('contact.bank.GEL')}>
        <CopyField label={t('contact.bank.labels.bankName')} value={bankDetailsGEL.bankName} />
        <CopyField label={t('contact.bank.labels.account')} value={bankDetailsGEL.account} />
        <CopyField label={t('contact.bank.labels.name')} value={bankDetailsGEL.name} />
      </BankAccountGroup>
      <BankAccountGroup title={t('contact.bank.USDEUR')}>
        <CopyField label={t('contact.bank.labels.name')} value={bankDetailsUSDEUR.name} />
        <CopyField label={t('contact.bank.labels.account')} value={bankDetailsUSDEUR.account} />
        <CopyField label={t('contact.bank.labels.bankName')} value={bankDetailsUSDEUR.bankName} />
        <CopyField label={t('contact.bank.labels.swift')} value={bankDetailsUSDEUR.code} />
        <CopyField label={t('contact.bank.labels.address')} value={bankDetailsUSDEUR.address} />
      </BankAccountGroup>
    </ContentCard>
  )
}

export default BankRequisitesSection
