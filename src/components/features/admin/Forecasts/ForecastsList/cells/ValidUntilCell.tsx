import { useTranslations } from 'next-intl'

import { getHoursLeft, useListDates, useTimeLeft } from '../../shared'

import { cn } from '@/lib/utils'

type ValidUntilCellProps = {
  // Card layout: "Valid until 05 Oct 2026 · ends in 8h" on one line
  isInline?: boolean
  now: Date
  validUntil: string | null
}

const ValidUntilCell = ({ isInline = false, now, validUntil }: ValidUntilCellProps) => {
  const t = useTranslations()
  const { formatDate, formatTime } = useListDates()
  const { formatLeft } = useTimeLeft()

  if (!validUntil) return <span className="text-placeholder">—</span>

  const hoursLeft = getHoursLeft(validUntil, now)
  const isEndingSoon = hoursLeft > 0 && hoursLeft < 24

  const getRemaining = () => {
    if (hoursLeft <= 0) return formatTime(validUntil)

    return formatLeft(validUntil, now)
  }

  const date = formatDate(validUntil)
  const remaining = <span className={cn(isEndingSoon && 'text-primary-ink')}>{getRemaining()}</span>

  if (isInline) {
    return (
      <span className="text-caption text-muted truncate tabular-nums">
        {t('admin.forecasts.list.validUntilInline', { date })} · {remaining}
      </span>
    )
  }

  return (
    <div className="flex flex-col tabular-nums">
      <span className="font-medium">{date}</span>
      <span className="text-caption text-muted">{remaining}</span>
    </div>
  )
}

export default ValidUntilCell
