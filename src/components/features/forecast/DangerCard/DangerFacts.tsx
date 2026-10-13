import type { Forecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import ForecasterRow from './ForecasterRow'
import ValidUntilNote from './ValidUntilNote'
import useForecastDates from '../model/useForecastDates'

type DangerFactsProps = {
  forecast: Forecast
  isCurrentForecast: boolean
}

const cellClasses = 'bg-surface min-w-0 px-4 py-2.5'
const termClasses = 'text-muted text-xs'
const valueClasses = 'text-copy text-ink mt-0.5 font-semibold'
const noteClasses = 'text-muted text-caption block font-normal'

// Issued · Valid until · Forecaster. The 1px gaps over a rule-coloured
// background draw the dividers.
const DangerFacts = ({ forecast, isCurrentForecast }: DangerFactsProps) => {
  const t = useTranslations()
  const { formatDate, formatTime } = useForecastDates()
  const { createdAt, forecaster, publishedAt, validUntil } = forecast
  const issuedAt = publishedAt ?? createdAt

  return (
    <dl className="bg-rule border-rule mt-3.5 grid grid-cols-2 gap-px border-t">
      <div className={cellClasses}>
        <dt className={termClasses}>{t('common.labels.issuedAt')}</dt>
        <dd className={valueClasses}>
          {formatDate(issuedAt)}
          <span className={noteClasses}>{formatTime(issuedAt)}</span>
        </dd>
      </div>
      <div className={cellClasses}>
        <dt className={termClasses}>{t('common.labels.validUntil')}</dt>
        <dd className={valueClasses}>
          {formatDate(validUntil)}
          <span className={noteClasses}>
            <ValidUntilNote isCurrentForecast={isCurrentForecast} validUntil={validUntil} />
          </span>
        </dd>
      </div>
      {forecaster && <ForecasterRow name={forecaster} />}
    </dl>
  )
}

export default DangerFacts
