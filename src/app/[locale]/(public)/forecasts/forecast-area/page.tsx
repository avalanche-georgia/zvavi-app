import { GudauriForecastAreaMap } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations()

  return (
    <PageWrapper title={t('navigation.forecastArea')}>
      <GudauriForecastAreaMap />
    </PageWrapper>
  )
}

export default Page
