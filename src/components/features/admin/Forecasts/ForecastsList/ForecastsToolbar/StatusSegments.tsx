import { SegmentedControl } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { type ListStatusFilter, listStatusFilters } from '../model'

type StatusSegmentsProps = {
  counts: Record<ListStatusFilter, number>
  onChange: (status: ListStatusFilter) => void
  value: ListStatusFilter
}

const StatusSegments = ({ counts, onChange, value }: StatusSegmentsProps) => {
  const t = useTranslations()

  const options = listStatusFilters.map((status) => {
    const label = t(`admin.forecasts.filters.status.${status}`)

    return {
      ariaLabel: `${label} (${counts[status]})`,
      label: (
        <>
          {label}
          <span className="text-muted font-medium tabular-nums">{counts[status]}</span>
        </>
      ),
      value: status,
    }
  })

  return (
    <SegmentedControl
      ariaLabel={t('admin.forecasts.filters.status.label')}
      className="max-w-full overflow-x-auto"
      onChange={onChange}
      options={options}
      value={value}
    />
  )
}

export default StatusSegments
