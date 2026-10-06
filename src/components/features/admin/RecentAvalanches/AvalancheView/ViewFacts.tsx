import { type Fact, FactsGrid } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { dateFormat, dateTimeFormat } from '@domain/constants'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

const emptyValue = '—'

const ViewFacts = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const { createdAt, date, isDateUnknown, quantity, slabDepth, trigger, width } = avalanche

  const facts: Fact[] = [
    {
      label: t('admin.recentAvalanches.view.occurred'),
      value: isDateUnknown || !date ? t('common.words.unknown') : format(date, dateFormat),
    },
    { label: t('admin.recentAvalanches.view.logged'), value: format(createdAt, dateTimeFormat) },
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
