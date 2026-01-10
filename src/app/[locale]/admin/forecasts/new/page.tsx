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
  const parsedDuplicateId = duplicateId ? parseInt(duplicateId, 10) : null
  const isValidDuplicateId =
    parsedDuplicateId !== null && !Number.isNaN(parsedDuplicateId) && parsedDuplicateId > 0

  const {
    data: sourceForecast,
    isError,
    isLoading,
  } = useAdminGetForecast({
    enabled: isValidDuplicateId,
    forecastId: parsedDuplicateId ?? 0,
  })

  const handleCancel = () => {
    router.push(routes.admin.forecasts.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.root)
  }

  if (isValidDuplicateId && isLoading) {
    return <Spinner />
  }

  if (isValidDuplicateId && (isError || !sourceForecast)) {
    router.replace(routes.admin.forecasts.new)

    return <Spinner />
  }

  const initialBaseFormData = getInitialFormData(sourceForecast ?? null)
  const initialFormData = sourceForecast
    ? {
        ...initialBaseFormData,
        baseFormData: { ...initialBaseFormData.baseFormData, id: undefined },
      }
    : initialBaseFormData

  return (
    <ForecastForm
      initialFormData={initialFormData}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  )
}

export default NewForecastPage
