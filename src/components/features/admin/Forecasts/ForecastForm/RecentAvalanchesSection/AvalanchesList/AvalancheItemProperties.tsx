import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import { PropertyWrapper } from '../../common/listItem'

const AvalancheItemProperties = ({ avalanche }: { avalanche: Avalanche }) => {
  const t = useTranslations()
  const { location, quantity, size, slabDepth, trigger, type, width } = avalanche

  return (
    <div className="flex flex-1 flex-col gap-2">
      <PropertyWrapper title={t('admin.forecast.form.common.labels.avalancheSize')}>
        <p>{size}</p>
      </PropertyWrapper>

      {type && (
        <PropertyWrapper title={t('admin.forecast.form.recentAvalanches.labels.type')}>
          <p>{t(`common.avalancheTypes.${type}`)}</p>
        </PropertyWrapper>
      )}

      {trigger && (
        <PropertyWrapper title={t('admin.forecast.form.recentAvalanches.labels.trigger')}>
          <p>
            {trigger === 'unknown'
              ? t('common.words.unknown')
              : t(`admin.forecast.form.recentAvalanches.options.trigger.${trigger}`)}
          </p>
        </PropertyWrapper>
      )}

      {quantity != null && (
        <PropertyWrapper title={t('admin.forecast.form.recentAvalanches.labels.quantity')}>
          <p>{quantity}</p>
        </PropertyWrapper>
      )}

      {(width || slabDepth) && (
        <PropertyWrapper title={t('admin.forecast.form.recentAvalanches.labels.dimensions')}>
          <p>
            {width && `${width}m`}
            {width && slabDepth && ' / '}
            {slabDepth && `${slabDepth}cm`}
          </p>
        </PropertyWrapper>
      )}

      {location && (
        <PropertyWrapper title={t('admin.forecast.form.recentAvalanches.labels.location')}>
          <p>{location}</p>
        </PropertyWrapper>
      )}
    </div>
  )
}

export default AvalancheItemProperties
