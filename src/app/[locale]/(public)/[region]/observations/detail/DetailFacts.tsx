import { type Fact, FactsGrid } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import useFormatDay from './useFormatDay'

// Shown for facts the reporter left empty — the grid keeps its shape
const emptyValue = '—'

// Every fact is always shown
const DetailFacts = ({ observation }: { observation: PublicObservation }) => {
  const t = useTranslations()
  const formatDay = useFormatDay()
  const { createdAt, date, isDateUnknown, quantity, slabDepth, trigger, width } = observation

  const facts: Fact[] = [
    {
      label: t('observations.detail.facts.occurred'),
      value: isDateUnknown || !date ? t('common.words.unknown') : formatDay(date),
    },
    { label: t('observations.detail.facts.reported'), value: formatDay(createdAt) },
    { label: t('observations.labels.trigger'), value: t(`common.avalancheTriggers.${trigger}`) },
    { label: t('observations.labels.quantity'), value: String(quantity) },
    {
      label: t('observations.labels.slabDepth'),
      value: slabDepth === null ? emptyValue : t('common.units.centimeters', { value: slabDepth }),
    },
    {
      label: t('observations.labels.width'),
      value: width === null ? emptyValue : t('common.units.meters', { value: width }),
    },
  ]

  return <FactsGrid facts={facts} />
}

export default DetailFacts
