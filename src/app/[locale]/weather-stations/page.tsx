import { PageContent } from '@components/features/weatherStations'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.weatherStations.description'),
    title: t('seo.weatherStations.title'),
  }
}

const Page = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.weatherStations')}>
      <PageContent />
    </PageWrapper>
  )
}

export default Page
