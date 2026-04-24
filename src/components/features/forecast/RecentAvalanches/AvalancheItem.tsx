import { Aspects } from '@components/features/admin/Forecasts/ForecastForm/common/listItem'
import { dateFormat } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type PropertyRowProps = { label: string; value: React.ReactNode }

const PropertyRow = ({ label, value }: PropertyRowProps) => (
  <div>
    <span className="font-semibold">{label}: </span>
    <span>{value}</span>
  </div>
)

const AvalancheItem = ({ avalanche }: { avalanche: Avalanche }) => {
  const t = useTranslations()
  const {
    date,
    description,
    isDateUnknown,
    location,
    quantity,
    size,
    slabDepth,
    trigger,
    type,
    width,
  } = avalanche

  const dateDisplay = isDateUnknown
    ? t('admin.forecast.form.recentAvalanches.labels.dateUnknown')
    : date
      ? format(date, dateFormat)
      : null

  const dimensionsDisplay =
    width || slabDepth
      ? [width ? `${width}m` : null, slabDepth ? `${slabDepth}cm` : null]
          .filter(Boolean)
          .join(' / ')
      : null

  return (
    <div className="flex flex-col gap-4">
      {dateDisplay && <PropertyRow label={t('common.labels.date')} value={dateDisplay} />}

      <div className="flex items-start gap-8">
        <div className="w-20 rounded-lg bg-gray-200 p-2 text-center">
          <h4 className="flex-none font-semibold">
            {t('forecast.sections.recentAvalanches.labels.size')}:
          </h4>
          <p className="text-3xl">{size}</p>
        </div>

        <Aspects item={avalanche} />
      </div>

      {type && (
        <PropertyRow
          label={t('forecast.sections.recentAvalanches.labels.type')}
          value={t(`common.avalancheTypes.${type}`)}
        />
      )}

      {trigger && (
        <PropertyRow
          label={t('forecast.sections.recentAvalanches.labels.trigger')}
          value={t(`common.avalancheTriggers.${trigger}`)}
        />
      )}

      {quantity != null && (
        <PropertyRow
          label={t('forecast.sections.recentAvalanches.labels.quantity')}
          value={quantity}
        />
      )}

      {dimensionsDisplay && (
        <PropertyRow
          label={t('forecast.sections.recentAvalanches.labels.dimensions')}
          value={dimensionsDisplay}
        />
      )}

      {location && (
        <PropertyRow
          label={t('forecast.sections.recentAvalanches.labels.location')}
          value={location}
        />
      )}

      {description && <p className="text-justify">{description}</p>}
    </div>
  )
}

export default AvalancheItem
