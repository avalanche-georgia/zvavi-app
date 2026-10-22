import type { ObservationsSort } from '@domain/types'
import { Select } from '@ds/primitives'
import { ArrowUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

type SortSelectProps = {
  onChange: (sort: ObservationsSort) => void
  value: ObservationsSort
}

const sorts: ObservationsSort[] = ['newest', 'largest']

// Icon and arrow only on phones, where the toolbar row is short on room
const SortSelect = ({ onChange, value }: SortSelectProps) => {
  const t = useTranslations()

  const options = sorts.map((sort) => ({
    label: t(`observations.filters.sort.${sort}`),
    value: sort,
  }))

  return (
    <Select
      ariaLabel={t('observations.filters.sort.label')}
      className="w-auto shrink-0"
      isValueHiddenOnPhone
      leading={<ArrowUpDown aria-hidden className="size-4" />}
      onValueChange={onChange}
      options={options}
      size="sm"
      value={value}
    />
  )
}

export default SortSelect
