'use client'

import { HistoryList } from '@components/features/history'
import { PageWrapper } from '@components/layout'
import { Spinner } from '@components/shared'
import { useHistoryListQuery } from '@data/hooks/forecasts'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations()
  const { data: forecasts, isPending } = useHistoryListQuery()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return (
    <PageWrapper title={t('navigation.history')}>
      <HistoryList forecasts={forecasts} />
    </PageWrapper>
  )
}

export default Page
