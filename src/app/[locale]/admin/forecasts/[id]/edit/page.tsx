'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { useParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const EditForecastPage = () => {
  const router = useRouter()
  const params = useParams()

  const forecastId = Number(params.id)

  const { data: forecast, isPending } = useAdminGetForecast({ forecastId })

  const handleCancel = () => {
    router.push(routes.admin.forecasts.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.root)
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (!forecast) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <p className="text-gray-600">Forecast not found.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white shadow">
      <ForecastForm
        initialFormData={getInitialFormData(forecast)}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default EditForecastPage
