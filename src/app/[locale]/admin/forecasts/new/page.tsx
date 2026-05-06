'use client'

import { ForecastForm, getInitialFormData } from '@components/features/admin/Forecasts/ForecastForm'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { defaultRegionId } from '@domain/constants'
import type { RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewForecastPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
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
    regionId,
  })

  const handleCancel = () => {
    router.push(routes.admin.forecasts.listByRegion(regionId))
  }

  const handleSuccess = () => {
    router.push(routes.admin.forecasts.listByRegion(regionId))
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
        baseFormData: { ...initialBaseFormData.baseFormData, id: undefined, validUntil: null },
      }
    : initialBaseFormData

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <ForecastForm
        initialFormData={initialFormData}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
        regionId={regionId}
      />
    </div>
  )
}

export default NewForecastPage
