import { timeFormat } from '@domain/constants'
import type { TimeRange } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { TimeOfDayIcon } from './icons'
import PropertyTile from './PropertyTile'

export interface TimeOfDayProps {
  timeOfDay: TimeRange
  isAllDay: boolean
}

const TimeOfDay = ({ isAllDay, timeOfDay }: TimeOfDayProps) => {
  const t = useTranslations()
  const { end, start } = timeOfDay
  const formattedStartTime = start ? format(start, timeFormat) : ''
  const formattedEndTime = end ? format(end, timeFormat) : ''

  return (
    <PropertyTile property={{ name: 'timeOfDay' }}>
      <div className="flex h-full flex-col justify-between">
        <p className="font-semibold">
          {isAllDay
            ? t('admin.forecast.form.problems.labels.allDay')
            : `${formattedStartTime}-${formattedEndTime}`}
        </p>

        <div className="ml-auto">
          <TimeOfDayIcon
            isAllDay={isAllDay}
            timeOfDay={{ end: formattedEndTime, start: formattedStartTime }}
          />
        </div>
      </div>
    </PropertyTile>
  )
}

export default TimeOfDay
