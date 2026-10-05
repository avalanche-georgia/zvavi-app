'use client'

import type { AdminForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import MetaRow from './MetaRow'
import type { ForecastViewStatus } from './model'
import { useListDates, useTimeLeft } from '../shared'

type MetaPanelProps = {
  forecast: AdminForecast
  now: Date
  status: ForecastViewStatus
}

// Right column on wide screens; under the content (auto-fill grid) when narrow
const MetaPanel = ({ forecast, now, status }: MetaPanelProps) => {
  const t = useTranslations()
  const { formatDate, formatTime } = useListDates()
  const { formatLeft } = useTimeLeft()
  const { createdAt, forecaster, publishedAt, validUntil } = forecast
  const key = 'admin.forecasts.view.meta'
  const formatDateTime = (value: string) => `${formatDate(value)}, ${formatTime(value)}`

  const getValidNote = () => {
    if (status === 'live' && validUntil) {
      return <span className="text-primary-ink">{formatLeft(validUntil, now)}</span>
    }

    if (status === 'expired') return <span className="text-muted">{t(`${key}.expired`)}</span>
  }

  return (
    // self-start: a stretched grid item can't stick. top-5: <main> is the scroll container
    <aside className="rounded-card border-rule bg-surface border px-4.5 py-1.5 @min-[1180px]:sticky @min-[1180px]:top-5 @min-[1180px]:self-start">
      <dl className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-4 @min-[1180px]:block">
        <MetaRow label={t(`${key}.status`)} value={t(`admin.forecasts.view.statuses.${status}`)} />
        <MetaRow
          label={t(`${key}.validUntil`)}
          note={getValidNote()}
          value={validUntil ? formatDateTime(validUntil) : '—'}
        />
        <MetaRow
          label={t(`${key}.published`)}
          value={publishedAt ? formatDateTime(publishedAt) : '—'}
        />
        <MetaRow label={t(`${key}.forecaster`)} value={forecaster || '—'} />
        <MetaRow label={t(`${key}.created`)} value={formatDateTime(createdAt)} />
      </dl>
    </aside>
  )
}

export default MetaPanel
