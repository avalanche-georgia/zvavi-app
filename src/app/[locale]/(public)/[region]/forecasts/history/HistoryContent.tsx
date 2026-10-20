'use client'

import { HistoryList } from '@components/features/history'
import { LoadError, Loading } from '@components/shared'
import { useHistoryListQuery } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'

const HistoryContent = () => {
  const { region } = useRegionContext()
  const { data: forecasts, isError, isPending, refetch } = useHistoryListQuery(region!.id)

  if (isPending) return <Loading />

  if (isError || !forecasts) return <LoadError onRetry={refetch} />

  return <HistoryList forecasts={forecasts} regionId={region!.id} />
}

export default HistoryContent
