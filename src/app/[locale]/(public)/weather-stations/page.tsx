import { PageContent } from '@components/features/weatherStations'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.weatherStations.description'),
    title: t('seo.weatherStations.title'),
  }
}

// Full-height split layout (list | map) — the page renders its own heading
const Page = () => <PageContent />

export default Page
