import { PageContent } from '@components/features/partners'
import { PageWrapper } from '@components/layout'
import { useTranslations } from 'next-intl'

const PartnersPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.partners')}>
      <PageContent />
    </PageWrapper>
  )
}

export default PartnersPage
