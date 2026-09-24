import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import useFormatDay from './useFormatDay'

type Fact = { label: string; value: string }

// Two-column grid with hairline dividers; facts without a value are left out
const DetailFacts = ({ observation }: { observation: PublicObservation }) => {
  const t = useTranslations()
  const formatDay = useFormatDay()
  const { createdAt, date, isDateUnknown, quantity, slabDepth, trigger, width } = observation

  const facts: (Fact | false)[] = [
    {
      label: t('observations.detail.facts.occurred'),
      value: isDateUnknown || !date ? t('common.words.unknown') : formatDay(date),
    },
    { label: t('observations.detail.facts.reported'), value: formatDay(createdAt) },
    { label: t('observations.labels.trigger'), value: t(`common.avalancheTriggers.${trigger}`) },
    { label: t('observations.labels.quantity'), value: String(quantity) },
    slabDepth !== null && {
      label: t('observations.labels.slabDepth'),
      value: t('common.units.centimeters', { value: slabDepth }),
    },
    width !== null && {
      label: t('observations.labels.width'),
      value: t('common.units.meters', { value: width }),
    },
  ]

  return (
    <dl className="bg-rule border-rule mx-4 mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border">
      {facts
        .filter((fact): fact is Fact => fact !== false)
        .map(({ label, value }) => (
          <div key={label} className="bg-white px-3 py-2.5">
            <dt className="text-muted text-xs">{label}</dt>
            <dd className="mt-0.5 text-[15px] font-semibold">{value}</dd>
          </div>
        ))}
    </dl>
  )
}

export default DetailFacts
