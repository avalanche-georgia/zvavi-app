'use client'

import {
  CurrentCard,
  ForecastsTabBar,
  ForecastsTable,
  ForecastsToolbar,
  ListLoadError,
  useForecastsListPage,
} from '@components/features/admin/Forecasts/ForecastsList'
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
      <div className="@container mx-auto flex w-full max-w-360 flex-col gap-4 px-3 py-4 md:px-8 md:pt-6 md:pb-10">
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
      </div>
    </>
  )
}

export default ForecastsContainer
