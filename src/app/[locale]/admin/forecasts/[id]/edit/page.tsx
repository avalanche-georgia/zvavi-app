'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { defaultRegionId } from '@domain/constants'
import type { RegionId } from '@domain/types'
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
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
  const { data: forecast, isPending } = useAdminGetForecast({ forecastId, regionId })

  const handleCancel = () => {
    router.push(routes.admin.forecasts.listByRegion(regionId))
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.listByRegion(regionId))
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
        regionId={regionId}
      />
    </div>
  )
}

export default EditForecastPage
