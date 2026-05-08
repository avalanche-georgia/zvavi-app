import { ForecastAreaMap } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { getTranslations } from 'next-intl/server'

type PageProps = { params: Promise<{ region: string }> }

const Page = async ({ params }: PageProps) => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return (
    <PageWrapper
      title={t('forecast.forecastAreaPageTitle', { regionName: t(`regions.names.${regionId}`) })}
    >
      <ForecastAreaMap />
    </PageWrapper>
  )
}

export default Page
