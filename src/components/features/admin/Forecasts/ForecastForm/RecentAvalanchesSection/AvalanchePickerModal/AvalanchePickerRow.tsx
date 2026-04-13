import { useCallback } from 'react'
import { Checkbox } from '@components/ui'
import type { AvalancheWithForecasts } from '@data/hooks/forecasts'
import { dateFormat } from '@domain/constants'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type AvalanchePickerRowProps = {
  avalanche: AvalancheWithForecasts
  isSelected: boolean
  onToggle: (id: number) => void
}

const AvalanchePickerRow = ({ avalanche, isSelected, onToggle }: AvalanchePickerRowProps) => {
  const t = useTranslations()
  const { date, description, forecastAvalanche, id, isDateUnknown, size } = avalanche

  const dateDisplay = isDateUnknown
    ? t('admin.forecast.form.recentAvalanches.labels.dateUnknown')
    : date
      ? format(new Date(date), dateFormat)
      : null

  const forecastDates = forecastAvalanche
    .map((entry) => format(new Date(entry.forecasts.createdAt), dateFormat))
    .join(', ')

  const handleToggle = useCallback(() => onToggle(id), [id, onToggle])

  return (
    <li
      className={clsx(
        'flex cursor-pointer items-start gap-3 rounded-sm p-3 transition-colors hover:bg-gray-50',
        { 'bg-primary/5': isSelected },
      )}
      onClick={handleToggle}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox isChecked={isSelected} onChange={handleToggle} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-3">
          <span className="font-semibold">{dateDisplay ?? '—'}</span>
          <span className="flex size-6 items-center justify-center rounded-sm bg-gray-200 text-sm font-bold">
            {size}
          </span>
        </div>

        {description && <p className="mb-1 line-clamp-2 text-sm text-gray-700">{description}</p>}

        {forecastDates && (
          <p className="text-xs text-gray-500">
            {t('admin.forecast.form.recentAvalanches.labels.usedInForecasts')} {forecastDates}
          </p>
        )}
      </div>
    </li>
  )
}

export default AvalanchePickerRow
