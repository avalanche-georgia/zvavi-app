'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { regionIds } from '@domain/constants'
import { useParams } from 'next/navigation'
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

  const forecastId = Number(params.id)

  // TODO(PR 3): replace with regionId from admin route/context
  const regionIdMock = regionIds.gudauri
  const { data: forecast, isPending } = useAdminGetForecast({ forecastId, regionId: regionIdMock })

  const handleCancel = () => {
    router.push(routes.admin.forecasts.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.root)
  }

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

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <ForecastForm
        initialFormData={getInitialFormData(forecast)}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default EditForecastPage
