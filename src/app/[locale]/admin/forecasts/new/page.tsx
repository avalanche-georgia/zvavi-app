'use client'

import { useEffect } from 'react'
import {
  ForecastForm,
  getInitialFormValues,
} from '@components/features/admin/Forecasts/ForecastForm'
import { RequireRegionId } from '@components/shared'
import { Spinner } from '@components/ui'
import { useAdminGetForecast } from '@data/hooks/forecasts'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'
import type { RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewForecastContent = ({ regionId }: { regionId: RegionId }) => {
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
    isSuccess,
  } = useAdminGetForecast({
    enabled: isValidDuplicateId,
    forecastId: parsedDuplicateId ?? 0,
    regionId,
    // A wrong or foreign duplicateId won't start working on a retry — redirect
    // straight away instead of after the default backoff
    retry: false,
  })

  const { data: currentProfile, isPending: isProfilePending } = useCurrentUserProfileQuery()

  // Only once the source has loaded (or failed) — not while it's still on its way
  const shouldRedirectOnInvalidDuplicate =
    isValidDuplicateId && (isError || (isSuccess && !sourceForecast))

  useEffect(() => {
    if (!shouldRedirectOnInvalidDuplicate) return

    router.replace(routes.admin.forecasts.newInRegion(regionId))
  }, [regionId, shouldRedirectOnInvalidDuplicate, router])

  if (isProfilePending || (isValidDuplicateId && isLoading)) {
    return <Spinner />
  }

  if (shouldRedirectOnInvalidDuplicate) {
    return <Spinner />
  }

  const handleClose = () => {
    router.push(routes.admin.forecasts.listByRegion(regionId))
  }

  // A duplicate copies everything but when it expires; the forecaster is whoever
  // writes this one
  const initialValues = {
    ...getInitialFormValues(sourceForecast ?? null),
    forecaster: currentProfile?.fullName ?? '',
    validUntil: null,
  }

  return <ForecastForm initialValues={initialValues} onClose={handleClose} regionId={regionId} />
}

const NewForecastPage = () => (
  <RequireRegionId fallbackRoute={routes.admin.forecasts.root}>
    {(regionId) => <NewForecastContent regionId={regionId} />}
  </RequireRegionId>
)

export default NewForecastPage
