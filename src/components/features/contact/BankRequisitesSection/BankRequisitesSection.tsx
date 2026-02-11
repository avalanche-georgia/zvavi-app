import { bankDetailsGEL, bankDetailsUSDEUR } from '@components/constants'
import { CopyField } from '@components/shared'
import { useTranslations } from 'next-intl'

const BankRequisitesSection = () => {
  const t = useTranslations()

  return (
    <section className="space-y-3">
      <h4 className="text-lg font-semibold">{t('contact.bank.title')}</h4>
      <div className="mb-2">
        <p className="mb-1">{t('contact.bank.GEL')}</p>
        <div className="space-y-2 rounded-lg border p-3 shadow-sm">
          <CopyField label={t('joinUs.apply.payment.bankName')} value={bankDetailsGEL.bankName} />
          <CopyField label={t('contact.bank.labels.account')} value={bankDetailsGEL.account} />
          <CopyField label={t('contact.bank.labels.name')} value={bankDetailsGEL.name} />
        </div>
      </div>
      <div>
        <p className="mb-1">{t('contact.bank.USDEUR')}</p>
        <div className="space-y-2 rounded-lg border p-3 shadow-sm">
          <CopyField label={t('contact.bank.labels.name')} value={bankDetailsUSDEUR.name} />
          <CopyField label={t('contact.bank.labels.account')} value={bankDetailsUSDEUR.account} />
          <CopyField label={t('contact.bank.labels.bankName')} value={bankDetailsUSDEUR.bankName} />
          <CopyField label={t('contact.bank.labels.swift')} value={bankDetailsUSDEUR.code} />
          <CopyField label={t('contact.bank.labels.address')} value={bankDetailsUSDEUR.address} />
        </div>
      </div>
    </section>
  )
}

export default BankRequisitesSection
