'use client'

import type { AdminForecast } from '@domain/types'
import { useRouter } from 'src/i18n/navigation'

import { useForecastRowActions } from '../../shared'

import { routes } from '@/routes'

const useForecastViewActions = (forecast: AdminForecast, onLeave: VoidFunction) => {
  const router = useRouter()

  // The parent shows a spinner from here on, so the refetched "not found" never flashes
  const handleDeleted = () => {
    onLeave()
    router.replace(routes.admin.forecasts.listByRegion(forecast.regionId))
  }

  return useForecastRowActions(forecast, forecast.regionId, { onDeleted: handleDeleted })
}

export type ForecastViewActions = ReturnType<typeof useForecastViewActions>

export default useForecastViewActions
