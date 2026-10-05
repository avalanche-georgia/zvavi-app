'use client'

import {
  ForecastForm,
  getInitialFormValues,
} from '@components/features/admin/Forecasts/ForecastForm'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { useParams, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NotFound = () => {
  const t = useTranslations()

  return (
    <div className="rounded-lg bg-white p-6 text-center shadow-sm">
      <p className="text-gray-600">{t('admin.forecast.notFound')}</p>
    </div>
  )
}

const EditForecastPage = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const forecastId = Number(params.id)
  const { data: forecast, isPending } = useAdminGetForecast({
    enabled: !Number.isNaN(forecastId),
    forecastId,
  })

  if (Number.isNaN(forecastId)) {
    return <NotFound />
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (!forecast) {
    return <NotFound />
  }

  const closeHref =
    searchParams.get('from') === 'view'
      ? routes.admin.forecasts.view(forecast.id)
      : routes.admin.forecasts.listByRegion(forecast.regionId)

  const handleClose = () => {
    router.push(closeHref)
  }

  return (
    <ForecastForm
      closeHref={closeHref}
      forecastId={forecast.id}
      initialValues={getInitialFormValues(forecast)}
      onClose={handleClose}
      regionId={forecast.regionId}
    />
  )
}

export default EditForecastPage
