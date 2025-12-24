import { PageSection } from '@components/layout'
import { ButtonLink, HazardLevelBanner, Spoiler } from '@components/shared'
import { partners } from '@data/constants/partners'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import AdditionalHazards from './AdditionalHazards'
import { HazardLevelsByElevation } from './HazardLevelsByElevation'
import PartnersScrollBox from './PartnersScrollBox'
import { Problems } from './Problems'
import { RecentAvalanches } from './RecentAvalanches'
import Snowpack from './Snowpack'
import Weather from './Weather'

import { routes } from '@/routes'

// Tier 1 and 2 partners only should be displayed on the forecast page
const partnerList = Object.entries(partners)
  .filter(([tier]) => Number(tier) !== 3)
  .flatMap(([, list]) => list)
  .filter((partner) => !partner.isHidden)

const Forecast = ({ forecast }: { forecast: FullForecast }) => {
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
        <p className="whitespace-pre-line text-justify">{summary}</p>
      </Spoiler>
      <HazardLevelsByElevation hazardLevels={hazardLevels} />
      <Problems problems={avalancheProblems} />

      <section className="space-y-4">
        <RecentAvalanches avalanches={recentAvalanches} />
        <Snowpack snowpack={snowpack} />
        {additionalHazards && <AdditionalHazards additionalHazards={additionalHazards} />}
        <Weather weather={weather} />
      </section>

      <ButtonLink href={routes.forecastArea}>{t('forecast.viewForecastArea')}</ButtonLink>

      {partnerList.length > 0 && (
        <PageSection title={t('forecast.sections.partners.title')}>
          <PartnersScrollBox partners={partnerList} />
        </PageSection>
      )}
    </div>
  )
}

export default Forecast
