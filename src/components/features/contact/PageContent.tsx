import { richBold } from '@components/shared'
import { Alert } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { BankRequisitesSection } from './BankRequisitesSection'
import GetInTouchSection from './GetInTouchSection'

// Get in touch · bank transfer · not a rescue service
const PageContent = () => {
  const t = useTranslations()

  return (
    <>
      <GetInTouchSection />
      <BankRequisitesSection />
      <Alert title={t('contact.emergencyDisclaimer.title')} tone="danger">
        {t.rich('contact.emergencyDisclaimer.description', { b: richBold })}
      </Alert>
    </>
  )
}

export default PageContent
