'use client'

import {
  CurrentCard,
  ForecastsTabBar,
  ForecastsTable,
  ForecastsToolbar,
  useForecastsListPage,
} from '@components/features/admin/Forecasts/ForecastsList'
import { ListLoadError } from '@components/features/admin/shared'
import { AdminPageBody } from '@components/layout/admin'
import { defaultRegionId } from '@domain/constants'
import type { Region, RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'

type ForecastsContainerProps = { initialRegions?: Region[] }

const ForecastsContainer = ({ initialRegions }: ForecastsContainerProps) => {
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId
  const page = useForecastsListPage(regionId)
  const { currentQuery, forecastsQuery, list, now } = page

  // A failed background refetch keeps the data on screen; the error block is for first loads
  const isListLoadFailed = forecastsQuery.isError && !forecastsQuery.data
  const isCurrentLoadFailed = currentQuery.isError && currentQuery.data === undefined

  const handleCurrentRetry = () => void currentQuery.refetch()
  const handleListRetry = () => void forecastsQuery.refetch()

  return (
    <>
      <ForecastsTabBar initialRegions={initialRegions} regionId={regionId} />
      <AdminPageBody>
        <CurrentCard
          currentForecast={currentQuery.data}
          forecasts={page.forecasts}
          isError={isCurrentLoadFailed}
          isPending={currentQuery.isPending || forecastsQuery.isPending}
          now={now}
          onRetry={handleCurrentRetry}
          regionId={regionId}
        />
        <ForecastsToolbar
          counts={page.counts}
          list={list}
          now={now}
          searchResetKey={page.searchResetKey}
        />
        {isListLoadFailed ? (
          <ListLoadError onRetry={handleListRetry} />
        ) : (
          <ForecastsTable
            currentForecastId={currentQuery.data?.id ?? null}
            forecasts={page.visibleForecasts}
            hasForecasts={page.forecasts.length > 0}
            isLoading={forecastsQuery.isPending}
            list={list}
            now={now}
            regionId={regionId}
          />
        )}
      </AdminPageBody>
    </>
  )
}

export default ForecastsContainer
