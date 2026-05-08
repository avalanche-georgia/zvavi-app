import { CurrentForecastContainer } from '@components/features/home/CurrentForecast'
import { Partners } from '@components/features/home/Partners'
import fetchTier1Partners from '@data/queries/fetchTier1Partners'

import RegionHomeQuickLinks from './RegionHomeQuickLinks'

const RegionHomePage = async () => {
  const partners = await fetchTier1Partners()

  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-8 px-4 pt-3 pb-6">
      <CurrentForecastContainer />
      <RegionHomeQuickLinks />
      <Partners partners={partners} />
    </div>
  )
}

export default RegionHomePage
