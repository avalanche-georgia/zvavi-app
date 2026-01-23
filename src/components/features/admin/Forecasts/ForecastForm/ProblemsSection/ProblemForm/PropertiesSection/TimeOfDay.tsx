import { useCallback } from 'react'
import { Checkbox, TimePicker } from '@components/ui'
import { useTranslations } from 'next-intl'

import type { ProblemFormData } from '../ProblemForm'

type TimeOfDayProps = {
  onTimeChange: (value: React.SetStateAction<ProblemFormData>) => void
  problemData: ProblemFormData
}

const timePickerClassName = 'w-20 rounded bg-gray-100 px-2'

const TimeOfDay = ({ onTimeChange, problemData }: TimeOfDayProps) => {
  const t = useTranslations()
  const tProblems = useTranslations('admin.forecast.form.problems')

  const handleCheckboxChange = useCallback(
    (value: boolean) => {
      onTimeChange((prev) => ({
        ...prev,
        isAllDay: value,
      }))
    },
    [onTimeChange],
  )

  const handleStartTimeChange = useCallback(
    (time: Date | null) => {
      onTimeChange((prev) => ({
        ...prev,
        timeOfDay: {
          end: prev.timeOfDay.end,
          start: time,
        },
      }))
    },
    [onTimeChange],
  )

  const handleEndTimeChange = useCallback(
    (time: Date | null) => {
      onTimeChange((prev) => ({
        ...prev,
        timeOfDay: {
          end: time,
          start: prev.timeOfDay.start,
        },
      }))
    },
    [onTimeChange],
  )

  return (
    <div className="flex items-start gap-4">
      <h4 className="w-28 flex-none font-semibold">{tProblems('labels.timeOfDay')}</h4>
      <div className="flex flex-1 items-center justify-between gap-4">
        <Checkbox
          className="bg-gray-200"
          isChecked={problemData.isAllDay}
          label={tProblems('labels.allDay')}
          labelPosition="left"
          onChange={handleCheckboxChange}
        />

        {!problemData.isAllDay && (
          <div className="flex items-center gap-1">
            <div>
              <TimePicker
                className={timePickerClassName}
                isClearable
                onChange={handleStartTimeChange}
                placeholder={t('common.words.from')}
                value={problemData.timeOfDay.start as Date | null}
              />
            </div>
            —
            <div>
              <TimePicker
                className={timePickerClassName}
                isClearable
                onChange={handleEndTimeChange}
                placeholder={t('common.words.to')}
                value={problemData.timeOfDay.end as Date | null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimeOfDay
