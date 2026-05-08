import { AboutUs, JoinUs, Partners } from '@components/features/home'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'
import { getTranslations } from 'next-intl/server'

const Home = async () => {
  const [partners, t] = await Promise.all([fetchTier1Partners(), getTranslations()])

  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-8 px-4 pt-3 pb-6">
      {/* TODO(PR 5): replace with real RegionPickerMap (Leaflet, polygons colored by hazard level) */}
      <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
        {t('regions.picker.title')}
      </div>

      <Partners partners={partners} />
      <AboutUs />
      <JoinUs />
    </div>
  )
}

export default Home
