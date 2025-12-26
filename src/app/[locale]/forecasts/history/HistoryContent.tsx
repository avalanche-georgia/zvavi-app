'use client'

import { HistoryList } from '@components/features/history'
import { Spinner } from '@components/ui'
import { useHistoryListQuery } from '@data/hooks/forecasts'
import { useTranslations } from 'next-intl'

const HistoryContent = () => {
  const t = useTranslations()
  const { data: forecasts, isPending } = useHistoryListQuery()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return <HistoryList forecasts={forecasts} />
}

export default HistoryContent
