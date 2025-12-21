import { PageContent } from '@components/features/weatherStations'
import { PageWrapper } from '@components/layout'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.weatherStations')}>
      <PageContent />
    </PageWrapper>
  )
}

export default Page
