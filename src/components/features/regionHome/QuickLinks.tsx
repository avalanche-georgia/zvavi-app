import type { RegionId } from '@domain/types'
import { History, Mountain, RadioTower } from 'lucide-react'
import { useTranslations } from 'next-intl'

import QuickLinkTile from './QuickLinkTile'

import { routes } from '@/routes'

type QuickLinksProps = {
  regionId: RegionId
  // null: unknown
  weatherStationsCount: number | null
}

// Forecast area · Weather stations · Past forecasts
const QuickLinks = ({ regionId, weatherStationsCount }: QuickLinksProps) => {
  const t = useTranslations()
  const forecastRoutes = routes.forecastsByRegion(regionId)

  return (
    <ul className="grid grid-cols-3 gap-2">
      <li>
        <QuickLinkTile
          href={forecastRoutes.forecastArea}
          icon={<Mountain />}
          label={t('navigation.forecastArea')}
          note={t('regionHome.quickLinks.forecastArea')}
        />
      </li>
      <li>
        <QuickLinkTile
          href={routes.weatherStations}
          icon={<RadioTower />}
          label={t('navigation.weatherStations')}
          note={
            weatherStationsCount === null
              ? undefined
              : t('regionHome.quickLinks.weatherStations', { count: weatherStationsCount })
          }
        />
      </li>
      <li>
        <QuickLinkTile
          href={forecastRoutes.history}
          icon={<History />}
          label={t('navigation.history')}
          note={t('regionHome.quickLinks.history')}
        />
      </li>
    </ul>
  )
}

export default QuickLinks
