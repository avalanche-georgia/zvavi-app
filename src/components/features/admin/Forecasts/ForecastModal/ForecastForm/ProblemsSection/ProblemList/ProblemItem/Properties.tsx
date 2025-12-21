import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import TimeOfDay from './TimeOfDay'
import { PropertyWrapper } from '../../../common/listItem'

const Properties = ({ problemData }: { problemData: Problem }) => {
  const tProblems = useTranslations('admin.forecast.form.problems')
  const tForm = useTranslations('admin.forecast.form')
  const { avalancheSize, confidence, distribution, isAllDay, sensitivity, timeOfDay, trend } =
    problemData

  return (
    <>
      <div className="flex-1">
        <PropertyWrapper title={tForm('common.labels.avalancheSize')}>
          <p>{avalancheSize}</p>
        </PropertyWrapper>

        <TimeOfDay isAllDay={isAllDay} timeOfDay={timeOfDay} />

        <PropertyWrapper title={tProblems('labels.sensitivity')}>
          <p>{tProblems(`options.sensitivityLevel.${sensitivity}`)}</p>
        </PropertyWrapper>
      </div>

      <div className="flex-1">
        <PropertyWrapper title={tProblems('labels.trend')}>
          <p>{tProblems(`options.trend.${trend}`)}</p>
        </PropertyWrapper>

        <PropertyWrapper title={tProblems('labels.confidence')}>
          <p>{tProblems(`options.confidence.${confidence}`)}</p>
        </PropertyWrapper>

        <PropertyWrapper title={tProblems('labels.distribution')}>
          <p>{tProblems(`options.distribution.${distribution}`)}</p>
        </PropertyWrapper>
      </div>
    </>
  )
}

export default Properties
