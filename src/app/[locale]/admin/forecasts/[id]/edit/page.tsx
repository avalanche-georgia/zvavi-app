'use client'

import {
  ForecastForm,
  getInitialFormValues,
} from '@components/features/admin/Forecasts/ForecastForm'
import { Loading, RecordNotFound } from '@components/features/admin/shared'
import { AdminPageBody } from '@components/layout/admin'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { useParams, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NotFound = () => {
  const t = useTranslations()

  return (
    <AdminPageBody className="max-w-2xl">
      <RecordNotFound
        backHref={routes.admin.forecasts.root}
        message={t('admin.forecast.notFound')}
      />
    </AdminPageBody>
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
    return <Loading isPage />
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
