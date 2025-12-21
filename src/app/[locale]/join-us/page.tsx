import { PageContent } from '@components/features/join'
import { PageWrapper } from '@components/layout'
import { useTranslations } from 'next-intl'

const JoinUsPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.joinUs')}>
      <PageContent />
    </PageWrapper>
  )
}

export default JoinUsPage
