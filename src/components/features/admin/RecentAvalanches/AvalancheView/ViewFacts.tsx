import { type Fact, FactsGrid } from '@components/features/observations'
import { useFormatTimeOfDay } from '@components/hooks'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { dateFormat, dateTimeFormat } from '@domain/constants'
import { useTranslations } from 'next-intl'

import { formatTbilisi } from '@/lib/tbilisiTime'

const emptyValue = '—'

const ViewFacts = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const { withTime } = useFormatTimeOfDay()
  const { createdAt, date, isDateUnknown, quantity, slabDepth, trigger, width } = avalanche

  const facts: Fact[] = [
    {
      label: t('admin.recentAvalanches.view.occurred'),
      value:
        isDateUnknown || !date
          ? t('common.words.unknown')
          : withTime(formatTbilisi(date, dateFormat), avalanche),
    },
    {
      label: t('admin.recentAvalanches.view.logged'),
      value: formatTbilisi(createdAt, dateTimeFormat),
    },
    {
      label: t('admin.recentAvalanches.form.labels.trigger'),
      value: t(`common.avalancheTriggers.${trigger}`),
    },
    { label: t('admin.recentAvalanches.form.labels.quantity'), value: String(quantity) },
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

export default ViewFacts
