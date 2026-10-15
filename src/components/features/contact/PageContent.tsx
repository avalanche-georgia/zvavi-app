import { richBold } from '@components/shared'
import { ContentCard } from '@ds/patterns'
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
      <ContentCard title={t('contact.emergencyDisclaimer.title')} tone="danger">
        <p>{t.rich('contact.emergencyDisclaimer.description', { b: richBold })}</p>
      </ContentCard>
    </>
  )
}

export default PageContent
