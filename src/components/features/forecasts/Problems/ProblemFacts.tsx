import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import type { ProblemValues } from './problemSchema'

const optionsKey = 'admin.forecast.form.problems.options'
const labelsKey = 'admin.forecast.form.problems.labels'

// Sensitivity / Distribution / Trend / Confidence / Time of day
const ProblemFacts = ({ problem }: { problem: ProblemValues }) => {
  const t = useTranslations()
  const { confidence, distribution, isAllDay, sensitivity, timeOfDay, trend } = problem

  const formatTime = (value: Date | null) => (value ? format(value, 'HH:mm') : '…')
  const timeText = isAllDay
    ? t(`${labelsKey}.allDay`)
    : `${formatTime(timeOfDay.start)}–${formatTime(timeOfDay.end)}`

  const facts = [
    {
      label: t(`${labelsKey}.sensitivity`),
      value: t(`${optionsKey}.sensitivityLevel.${sensitivity}`),
    },
    {
      label: t(`${labelsKey}.distribution`),
      value: t(`${optionsKey}.distribution.${distribution}`),
    },
    { label: t(`${labelsKey}.trend`), value: t(`${optionsKey}.trend.${trend}`) },
    { label: t(`${labelsKey}.confidence`), value: t(`${optionsKey}.confidence.${confidence}`) },
    { label: t(`${labelsKey}.timeOfDay`), value: timeText },
  ]

  return (
    <dl className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-x-4 gap-y-2.5">
      {facts.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-0.5">
          <dt className="text-muted text-xs">{label}</dt>
          <dd className="text-copy text-ink font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ProblemFacts
