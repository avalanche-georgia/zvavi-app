import { createContext, useContext } from 'react'
import type { RegionId } from '@domain/types'

type ForecastsTableContextValue = {
  currentForecastId: number | null
  now: Date
  regionId: RegionId
}

// Values that change while the columns stay module-level (stable cell components)
export const ForecastsTableContext = createContext<ForecastsTableContextValue | null>(null)

export const useForecastsTable = () => {
  const value = useContext(ForecastsTableContext)

  if (!value) throw new Error('useForecastsTable must be used inside ForecastsTableContext')

  return value
}
