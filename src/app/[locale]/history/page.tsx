'use client'

import { useTranslations } from 'next-intl'

import { useHistoryListQuery } from '@/data/hooks/forecasts'

import { Spinner } from '@/UI/components'

import { PageWrapper } from '@/UI/containers'
import { HistoryList } from '@/UI/history'

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
