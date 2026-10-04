'use client'

import { Checkbox, Field, TextField } from '@ds/primitives'
import { format, parse } from 'date-fns'
import { useTranslations } from 'next-intl'

import type { ProblemDraft } from './problemSchema'
import type { SetProblemDraftField } from './useProblemDraft'

type TimeOfDayFieldProps = {
  draft: ProblemDraft
  setField: SetProblemDraftField
}

const timeFormat = 'HH:mm'

const toTimeText = (value: Date | null) => (value ? format(value, timeFormat) : '')
const toTime = (text: string) => (text ? parse(text, timeFormat, new Date()) : null)

// "All day", or a From–To window (same data as before: two times of day)
const TimeOfDayField = ({ draft, setField }: TimeOfDayFieldProps) => {
  const t = useTranslations()
  const { isAllDay, timeOfDay } = draft

  const handleStartChange = (text: string) =>
    setField('timeOfDay', { ...timeOfDay, start: toTime(text) })

  const handleEndChange = (text: string) =>
    setField('timeOfDay', { ...timeOfDay, end: toTime(text) })

  return (
    <div className="flex flex-col gap-2">
      <span className="text-copy text-ink font-semibold">
        {t('admin.forecast.form.problems.labels.timeOfDay')}
      </span>
      <Checkbox
        checked={isAllDay}
        label={t('admin.forecast.form.problems.labels.allDay')}
        onCheckedChange={(checked) => setField('isAllDay', checked)}
      />
      {!isAllDay && (
        <div className="grid grid-cols-2 gap-3">
          <Field label={t('common.words.from')}>
            <TextField
              onValueChange={handleStartChange}
              type="time"
              value={toTimeText(timeOfDay.start)}
            />
          </Field>
          <Field label={t('common.words.to')}>
            <TextField
              onValueChange={handleEndChange}
              type="time"
              value={toTimeText(timeOfDay.end)}
            />
          </Field>
        </div>
      )}
    </div>
  )
}

export default TimeOfDayField
