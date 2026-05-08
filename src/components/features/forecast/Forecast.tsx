import { ButtonLink, HazardLevelBanner, MarkdownContent, Spoiler } from '@components/shared'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import AdditionalHazards from './AdditionalHazards'
import ForecastPartnersSection from './ForecastPartnersSection'
import { HazardLevelsByElevation } from './HazardLevelsByElevation'
import { Problems } from './Problems'
import { RecentAvalanches } from './RecentAvalanches'
import Snowpack from './Snowpack'
import Weather from './Weather'

import { routes } from '@/routes'

type ForecastProps = {
  forecast: FullForecast
  regionId: string
}

const Forecast = ({ forecast, regionId }: ForecastProps) => {
  const t = useTranslations()
  const {
    additionalHazards,
    avalancheProblems,
    hazardLevels,
    recentAvalanches,
    snowpack,
    summary,
    weather,
  } = forecast

  return (
    <div className="space-y-4">
      <HazardLevelBanner forecast={forecast} />
      <Spoiler title={t('common.labels.summary')}>
        <div className="text-justify">
          <MarkdownContent content={summary} />
        </div>
      </Spoiler>
      <HazardLevelsByElevation hazardLevels={hazardLevels} />
      {avalancheProblems.length > 0 ? <Problems problems={avalancheProblems} /> : <hr />}

      <section className="space-y-4">
        <RecentAvalanches avalanches={recentAvalanches} />
        {snowpack && <Snowpack snowpack={snowpack} />}
        {additionalHazards && <AdditionalHazards additionalHazards={additionalHazards} />}
        {weather && <Weather weather={weather} />}
      </section>

      <ButtonLink href={routes.forecastsByRegion(regionId).forecastArea}>
        {t('forecast.viewForecastArea')}
      </ButtonLink>

      <ForecastPartnersSection />
    </div>
  )
}

export default Forecast
