import { differenceInMinutes } from 'date-fns'
import { useTranslations } from 'next-intl'

import { useListDates } from '../hooks'

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

  if (!validUntil) return <span className="text-placeholder">—</span>

  const hoursLeft = differenceInMinutes(validUntil, now) / 60
  const isEndingSoon = hoursLeft > 0 && hoursLeft < 24

  const getRemaining = () => {
    if (hoursLeft <= 0) return formatTime(validUntil)

    if (isEndingSoon) {
      return t('admin.forecasts.list.endsInHours', { count: Math.max(1, Math.round(hoursLeft)) })
    }

    return t('admin.forecasts.list.endsInDays', { count: Math.round(hoursLeft / 24) })
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
