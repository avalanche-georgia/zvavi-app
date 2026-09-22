import { dateFormat } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type ObservationCardProps = {
  observation: Avalanche
}

const ObservationCard = ({ observation }: ObservationCardProps) => {
  const t = useTranslations()

  const { date, description, isDateUnknown, location, size, submitterName, trigger, type } =
    observation

  const dateDisplay = isDateUnknown
    ? t('observations.card.dateUnknown')
    : date
      ? format(new Date(date), dateFormat)
      : '—'

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-gray-800">{dateDisplay}</span>
        <span className="flex size-6 items-center justify-center rounded-sm bg-gray-200 text-sm font-bold">
          {size}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
        <span>{t(`common.avalancheTypes.${type}`)}</span>
        <span>{t(`common.avalancheTriggers.${trigger}`)}</span>
        {location && <span>{location}</span>}
      </div>

      {description && <p className="text-sm text-gray-700">{description}</p>}

      {submitterName && (
        <p className="text-xs text-gray-400">
          {t('observations.card.submittedBy', { submitterName })}
        </p>
      )}
    </div>
  )
}

export default ObservationCard
