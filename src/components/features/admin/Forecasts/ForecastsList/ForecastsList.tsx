import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import ForecastItem from './ForecastItem'

const ForecastsList = ({ forecasts }: { forecasts: FullForecast[] }) => {
  const t = useTranslations()

  return (
    <div className="flex max-h-[calc(100vh-14rem)] w-full flex-col overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="flex w-full items-center gap-4 rounded-t bg-gray-100 px-4 py-1.5">
        <div className="w-64 font-semibold">{t('admin.forecasts.list.columns.forecaster')}</div>
        <div className="w-32 font-semibold">{t('admin.forecasts.list.columns.createdAt')}</div>
        <div className="w-32 font-semibold">{t('admin.forecasts.list.columns.validUntil')}</div>
        <div className="w-32 flex-1 font-semibold">
          {t('admin.forecasts.list.columns.publishedAt')}
        </div>
        <div className="w-28 font-semibold">{t('admin.forecasts.list.columns.status')}</div>
        <div className="w-52 pr-4 text-center font-semibold">
          {t('admin.forecasts.list.columns.actions')}
        </div>
      </div>

      <div className="overflow-y-auto">
        <ul className="flex flex-col">
          {forecasts.map((forecast) => (
            <li key={forecast.id} className="border-b last:border-0 even:bg-gray-100/60">
              <ForecastItem forecast={forecast} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ForecastsList
