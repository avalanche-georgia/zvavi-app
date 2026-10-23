import type { Forecast } from '@domain/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import ForecastNavLink from './ForecastNavLink'
import ShareButton from './ShareButton'
import useForecastDates from '../model/useForecastDates'

import { routes } from '@/routes'

type PageHeadProps = {
  forecast: Forecast
  nextForecastId: number | null
  previousForecastId: number | null
}

// "Gudauri Avalanche Forecast" · "Wed 15 Apr – Fri 17 Apr" · share · newer / older. The buttons
// line up with the title on phones, where the title may wrap, and sit centred on desktop
const PageHead = ({ forecast, nextForecastId, previousForecastId }: PageHeadProps) => {
  const t = useTranslations()
  const { formatDay } = useForecastDates()
  const { createdAt, publishedAt, regionId, validUntil } = forecast
  const forecastRoutes = routes.forecastsByRegion(regionId)
  const getHref = (id: number | null) => (id === null ? null : forecastRoutes.view(id))

  return (
    <div className="flex items-start gap-3 pt-4 pb-3 lg:items-center lg:pt-6 lg:pb-4">
      <div className="min-w-0 flex-1">
        <h1 className="text-title lg:text-title-lg m-0 font-bold">
          {t('forecast.pageTitle', { regionName: t(`regions.names.${regionId}`) })}
        </h1>
        <p className="text-muted text-copy-sm mt-1">
          {formatDay(publishedAt ?? createdAt)} – {formatDay(validUntil)}
        </p>
      </div>
      <ShareButton forecast={forecast} />
      {/* Latest first, as in every list: left steps to a newer forecast, right to an older one */}
      <nav className="flex gap-2">
        <ForecastNavLink href={getHref(nextForecastId)} label={t('forecast.page.newerForecast')}>
          <ChevronLeft aria-hidden className="size-4.5" />
        </ForecastNavLink>
        <ForecastNavLink
          href={getHref(previousForecastId)}
          label={t('forecast.page.olderForecast')}
        >
          <ChevronRight aria-hidden className="size-4.5" />
        </ForecastNavLink>
      </nav>
    </div>
  )
}

export default PageHead
