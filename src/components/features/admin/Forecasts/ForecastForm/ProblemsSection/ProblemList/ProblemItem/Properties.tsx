import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import TimeOfDay from './TimeOfDay'
import { PropertyWrapper } from '../../../common/listItem'

const Properties = ({ problemData }: { problemData: Problem }) => {
  const t = useTranslations()
  const { avalancheSize, confidence, distribution, isAllDay, sensitivity, timeOfDay, trend } =
    problemData

  return (
    <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-1">
      <PropertyWrapper title={t('admin.forecast.form.common.labels.avalancheSize')}>
        <p>{avalancheSize}</p>
      </PropertyWrapper>

      <PropertyWrapper title={t('admin.forecast.form.problems.labels.trend')}>
        <p>{t(`admin.forecast.form.problems.options.trend.${trend}`)}</p>
      </PropertyWrapper>

      <TimeOfDay isAllDay={isAllDay} timeOfDay={timeOfDay} />

      <PropertyWrapper title={t('admin.forecast.form.problems.labels.confidence')}>
        <p>{t(`admin.forecast.form.problems.options.confidence.${confidence}`)}</p>
      </PropertyWrapper>

      <PropertyWrapper title={t('admin.forecast.form.problems.labels.sensitivity')}>
        <p>{t(`admin.forecast.form.problems.options.sensitivityLevel.${sensitivity}`)}</p>
      </PropertyWrapper>

      <PropertyWrapper title={t('admin.forecast.form.problems.labels.distribution')}>
        <p>{t(`admin.forecast.form.problems.options.distribution.${distribution}`)}</p>
      </PropertyWrapper>
    </div>
  )
}

export default Properties
