'use client'

import { RadioGroup, Select } from '@components/ui'
import type { AvalancheSource } from '@domain/types'
import { useTranslations } from 'next-intl'

import { type CatalogStatus, catalogStatuses } from './catalogFilterParams'

type CatalogFiltersProps = {
  onSourceChange: (source: string | null) => void
  onStatusChange: (status: string | null) => void
  source: AvalancheSource | null
  status: CatalogStatus | null
}

// Placeholder value for "no filter" — Select and RadioGroup need a real value
const allValue = 'all'

const toFilterValue = (value: string | number) => (value === allValue ? null : String(value))

// Who logged it (team / public report) and publish status — catalog only
const CatalogFilters = ({
  onSourceChange,
  onStatusChange,
  source,
  status,
}: CatalogFiltersProps) => {
  const t = useTranslations()

  const sourceOptions = [
    { label: t('admin.recentAvalanches.filters.all'), value: allValue },
    { label: t('common.avalancheSources.team'), value: 'team' },
    { label: t('common.avalancheSources.external'), value: 'external' },
  ]

  const statusOptions = [
    { label: t('admin.recentAvalanches.filters.allStatuses'), value: allValue },
    ...catalogStatuses.map((value) => ({ label: t(`common.avalancheStatuses.${value}`), value })),
  ]

  const handleSourceChange = (value: string | number) => onSourceChange(toFilterValue(value))
  const handleStatusChange = (value: string) => onStatusChange(toFilterValue(value))

  return (
    <>
      <RadioGroup
        onChange={handleSourceChange}
        options={sourceOptions}
        value={source ?? allValue}
      />
      <Select
        className="h-9 w-40 bg-white"
        onChange={handleStatusChange}
        options={statusOptions}
        value={status ?? allValue}
      />
    </>
  )
}

export default CatalogFilters
