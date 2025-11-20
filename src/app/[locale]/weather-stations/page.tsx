import { useTranslations } from 'next-intl'

import { PageWrapper } from '@/UI/containers'
import { PageContent } from '@/UI/weatherStations'

const Page = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.weatherStations')}>
      <PageContent />
    </PageWrapper>
  )
}

export default Page
