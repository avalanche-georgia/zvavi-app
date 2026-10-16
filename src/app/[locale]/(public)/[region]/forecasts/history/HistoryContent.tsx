'use client'

import { HistoryList } from '@components/features/history'
import { Loading } from '@components/shared'
import { useHistoryListQuery } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'

const HistoryContent = () => {
  const { region } = useRegionContext()
  const { data: forecasts, isPending } = useHistoryListQuery(region!.id)

  if (isPending) return <Loading isPage />

  if (!forecasts) return null

  return <HistoryList forecasts={forecasts} regionId={region!.id} />
}

export default HistoryContent
