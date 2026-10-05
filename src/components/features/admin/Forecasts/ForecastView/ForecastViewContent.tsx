'use client'

import { useGetCurrentForecast } from '@data/hooks/forecasts'
import type { AdminForecast } from '@domain/types'
import { useNow } from 'next-intl'

import { useForecastViewActions, ViewActions } from './actions'
import CenteredSpinner from './CenteredSpinner'
import { Breadcrumb, ViewSubline, ViewTitle } from './header'
import MetaPanel from './MetaPanel'
import { getViewStatus } from './model'
import {
  AvalanchesCard,
  ConditionsCard,
  HazardSplitCard,
  ProblemsCard,
  SummaryCard,
} from './sections'
import StatusBanner from './StatusBanner'
import { getInitialFormValues } from '../ForecastForm'

type ForecastViewContentProps = {
  forecast: AdminForecast
  // Deleted: the parent shows a spinner until the list loads
  onLeave: VoidFunction
}

const ForecastViewContent = ({ forecast, onLeave }: ForecastViewContentProps) => {
  const now = useNow({ updateInterval: 60_000 })
  const actions = useForecastViewActions(forecast, onLeave)
  const { data: currentForecast = null, isPending } = useGetCurrentForecast({
    isShort: true,
    regionId: forecast.regionId,
  })

  if (isPending) return <CenteredSpinner />

  const status = getViewStatus(forecast, currentForecast, now)
  const { avalancheProblems } = getInitialFormValues(forecast)

  return (
    <div className="@container">
      <div className="mx-auto grid max-w-304 grid-cols-1 gap-8 px-3 pt-3 pb-8 @min-[700px]:px-8 @min-[700px]:pt-5 @min-[700px]:pb-12 @min-[1180px]:grid-cols-[minmax(0,880px)_240px]">
        {/* Not <main>: the admin layout already renders it */}
        <div className="flex min-w-0 flex-col gap-4">
          <Breadcrumb regionId={forecast.regionId} />
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <ViewTitle forecast={forecast} status={status} />
              <ViewSubline forecast={forecast} />
            </div>
            <ViewActions actions={actions} forecast={forecast} />
          </header>
          <StatusBanner
            currentForecast={currentForecast}
            forecast={forecast}
            onDuplicate={actions.onDuplicate}
            status={status}
          />
          <HazardSplitCard hazardLevels={forecast.hazardLevels} />
          <SummaryCard summary={forecast.summary} />
          <ProblemsCard problems={avalancheProblems} />
          <AvalanchesCard avalancheIds={forecast.recentAvalancheIds} regionId={forecast.regionId} />
          <ConditionsCard forecast={forecast} />
        </div>
        <MetaPanel forecast={forecast} now={now} status={status} />
      </div>
    </div>
  )
}

export default ForecastViewContent
