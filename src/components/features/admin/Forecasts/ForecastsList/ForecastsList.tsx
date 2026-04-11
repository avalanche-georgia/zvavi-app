import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import Column from './Column'
import ForecastItem from './ForecastItem'

import { routes } from '@/routes'

const ForecastsList = ({ forecasts }: { forecasts: FullForecast[] }) => {
  const t = useTranslations()

  return (
    <>
      <ButtonLink className="mb-4 ml-auto" href={routes.admin.forecasts.new}>
        <Icon icon="plus" size="sm" />
        {t('admin.forecast.title.create')}
      </ButtonLink>

      <div className="flex max-h-[calc(100vh-12rem)] w-full flex-col overflow-hidden rounded-sm border bg-white p-4 shadow-sm">
        <div className="flex w-full items-center gap-4 rounded-t bg-gray-100 px-4 py-1.5">
          <Column className="font-semibold">{t('admin.forecasts.list.columns.forecaster')}</Column>
          <Column className="font-semibold">{t('admin.forecasts.list.columns.createdAt')}</Column>
          <Column className="font-semibold">{t('admin.forecasts.list.columns.validUntil')}</Column>
          <Column className="font-semibold">{t('admin.forecasts.list.columns.status')}</Column>
          <Column className="pr-4 text-right font-semibold">
            {t('admin.forecasts.list.columns.actions')}
          </Column>
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
    </>
  )
}

export default ForecastsList
