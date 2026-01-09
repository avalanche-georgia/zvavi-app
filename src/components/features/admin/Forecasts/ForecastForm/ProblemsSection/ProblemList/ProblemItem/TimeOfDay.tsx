import { timeFormat } from '@domain/constants'
import type { TimeRange } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { PropertyWrapper } from '../../../common/listItem'

type TimeOfDayProps = {
  timeOfDay: TimeRange
  isAllDay: boolean
}

const TimeOfDay = ({ isAllDay, timeOfDay }: TimeOfDayProps) => {
  const tProblems = useTranslations('admin.forecast.form.problems')

  return (
    <PropertyWrapper title={tProblems('labels.timeOfDay')}>
      <p>
        {isAllDay
          ? tProblems('labels.allDay')
          : `${format(timeOfDay?.start as Date, timeFormat)} — ${format(timeOfDay?.end as Date, timeFormat)}`}
      </p>
    </PropertyWrapper>
  )
}

export default TimeOfDay
