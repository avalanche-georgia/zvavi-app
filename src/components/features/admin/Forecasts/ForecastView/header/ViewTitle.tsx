import type { AdminForecast } from '@domain/types'

import { StatusBadge, useListDates } from '../../shared'
import { type ForecastViewStatus, toListStatus } from '../model'

type ViewTitleProps = {
  forecast: AdminForecast
  status: ForecastViewStatus
}

const ViewTitle = ({ forecast, status }: ViewTitleProps) => {
  const { formatDay } = useListDates()
  const { createdAt, id, publishedAt, validUntil } = forecast
  const range = `${formatDay(publishedAt ?? createdAt)} – ${validUntil ? formatDay(validUntil) : '—'}`

  // h2: the shell header already renders the page h1 ("Forecasts")
  return (
    <h2 className="text-ink flex flex-wrap items-center gap-2.5 text-[26px] font-semibold tracking-[-.02em]">
      {range}
      <span className="bg-tile text-muted rounded-badge text-copy-sm px-1.75 py-0.75 font-mono font-semibold">
        #{id}
      </span>
      <StatusBadge isExpired={status === 'expired'} status={toListStatus(status)} />
    </h2>
  )
}

export default ViewTitle
