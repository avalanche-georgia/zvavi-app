import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ObservationsSort } from '../helpers/searchParams'

type SortSelectProps = {
  onChange: (sort: ObservationsSort) => void
  value: ObservationsSort
}

const sorts: ObservationsSort[] = ['newest', 'largest']

// Native select — two options, and mobile gets the OS picker for free
const SortSelect = ({ onChange, value }: SortSelectProps) => {
  const t = useTranslations()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value as ObservationsSort)

  return (
    <div className="relative shrink-0">
      <select
        aria-label={t('observations.filters.sort.label')}
        className="border-rule text-ink focus-visible:outline-accent h-10.5 appearance-none rounded-[11px] border bg-white pr-7.5 pl-3 text-sm font-semibold focus-visible:outline-2"
        onChange={handleChange}
        value={value}
      >
        {sorts.map((sort) => (
          <option key={sort} value={sort}>
            {t(`observations.filters.sort.${sort}`)}
          </option>
        ))}
      </select>
      <ChevronDown className="text-muted pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
    </div>
  )
}

export default SortSelect
