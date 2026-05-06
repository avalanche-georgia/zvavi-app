'use client'

import { HistoryList } from '@components/features/history'
import { Spinner } from '@components/ui'
import { useHistoryListQuery } from '@data/hooks/forecasts'
import { regionIds } from '@domain/constants'
import { useTranslations } from 'next-intl'

const HistoryContent = () => {
  const t = useTranslations()
  // TODO(PR 4): replace with regionId from RegionContext
  const regionIdMock = regionIds.gudauri
  const { data: forecasts, isPending } = useHistoryListQuery(regionIdMock)

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return <HistoryList forecasts={forecasts} />
}

export default HistoryContent
