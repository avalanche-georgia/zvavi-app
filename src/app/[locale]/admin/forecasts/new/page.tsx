'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewForecastPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const duplicateId = searchParams.get('duplicateId')

  const { data: sourceForecast, isLoading } = useAdminGetForecast({
    enabled: !!duplicateId,
    forecastId: Number(duplicateId),
  })

  const handleCancel = () => {
    router.push(routes.admin.forecasts.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.root)
  }

  if (duplicateId && isLoading) {
    return <Spinner />
  }

  const initialFormData = getInitialFormData(sourceForecast ?? null)

  if (sourceForecast) {
    delete initialFormData.baseFormData.id
  }

  return (
    <ForecastForm
      initialFormData={initialFormData}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  )
}

export default NewForecastPage
