import { DangerCard } from '@components/features/forecast'
import type { Forecast, Partner, PublicObservation, RegionId } from '@domain/types'

import ExpiredNote from './ExpiredNote'
import MainPartnersCard from './MainPartnersCard'
import NoForecasterCard from './NoForecasterCard'
import QuickLinks from './QuickLinks'
import RecentAvalanchesCard from './RecentAvalanchesCard'
import RegionHead from './RegionHead'

import { routes } from '@/routes'

type RegionHomeProps = {
  // null: the region has no published forecast
  forecast: Forecast | null
  partners: Partner[]
  // null: the lookup failed
  recentAvalanches: PublicObservation[] | null
  regionId: RegionId
  // null: the lookup failed
  weatherStationsCount: number | null
}

const columnClasses = 'flex min-w-0 flex-col gap-3'

// The region's landing page: today's danger and main partners on the left,
// recent avalanches and shortcuts on the right (one column on mobile)
const RegionHome = (props: RegionHomeProps) => {
  const { forecast, partners, recentAvalanches, regionId, weatherStationsCount } = props

  return (
    <div className="bg-canvas text-ink min-h-full">
      <div className="mx-auto max-w-295 px-4 pb-12 lg:px-8 lg:pb-16">
        <RegionHead regionId={regionId} />
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-6">
          <div className={columnClasses}>
            {forecast ? (
              <>
                {/* "No rating" is the off-season forecast — it is not waiting for a new one */}
                {forecast.hazardLevels.overall !== '0' && (
                  <ExpiredNote validUntil={forecast.validUntil} />
                )}
                <DangerCard
                  action={{ forecastHref: routes.forecastsByRegion(regionId).current }}
                  forecast={forecast}
                  isCurrentForecast
                />
              </>
            ) : (
              <NoForecasterCard />
            )}
            <MainPartnersCard partners={partners} />
          </div>
          <div className={columnClasses}>
            <RecentAvalanchesCard avalanches={recentAvalanches} regionId={regionId} />
            <QuickLinks regionId={regionId} weatherStationsCount={weatherStationsCount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegionHome
