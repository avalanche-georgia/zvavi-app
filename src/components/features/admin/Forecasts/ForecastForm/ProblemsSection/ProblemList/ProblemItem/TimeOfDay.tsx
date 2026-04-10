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
  const t = useTranslations()

  return (
    <PropertyWrapper title={t('admin.forecast.form.problems.labels.timeOfDay')}>
      <p>
        {isAllDay
          ? t('admin.forecast.form.problems.labels.allDay')
          : `${format(timeOfDay?.start as Date, timeFormat)} — ${format(timeOfDay?.end as Date, timeFormat)}`}
      </p>
    </PropertyWrapper>
  )
}

export default TimeOfDay
