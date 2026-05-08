'use client'

import { HistoryList } from '@components/features/history'
import { Spinner } from '@components/ui'
import { useHistoryListQuery } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'

const HistoryContent = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const { data: forecasts, isPending } = useHistoryListQuery(region!.id)

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return <HistoryList forecasts={forecasts} regionId={region!.id} />
}

export default HistoryContent
