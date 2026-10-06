import { useState } from 'react'
import { formatAvalancheId } from '@components/features/observations'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { subDays } from 'date-fns'
import { useTranslations } from 'next-intl'

export type PickerPeriod = 'all' | 'last30' | 'last7'

const periodDays: Record<Exclude<PickerPeriod, 'all'>, number> = { last30: 30, last7: 7 }

// Search + period filter + multi-selection of the picker
const usePickerFilters = (avalanches: LinkableAvalanche[]) => {
  const t = useTranslations()
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState<PickerPeriod>('all')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const matchesQuery = (avalanche: LinkableAvalanche) => {
    const needle = query.trim().toLowerCase()

    if (!needle) return true

    const haystack = [
      formatAvalancheId(avalanche.id),
      t(`common.avalancheTypes.${avalanche.type}`),
      avalanche.trigger && t(`common.avalancheTriggers.${avalanche.trigger}`),
      avalanche.location,
    ]

    return haystack.some((text) => text?.toLowerCase().includes(needle))
  }

  const matchesPeriod = (avalanche: LinkableAvalanche) => {
    if (period === 'all') return true

    const since = subDays(new Date(), periodDays[period])

    return new Date(avalanche.date ?? avalanche.createdAt) >= since
  }

  const toggle = (id: number) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((selected) => selected !== id) : [...ids, id],
    )

  const reset = () => {
    setQuery('')
    setPeriod('all')
    setSelectedIds([])
  }

  return {
    period,
    query,
    reset,
    selectedIds,
    setPeriod,
    setQuery,
    toggle,
    visible: avalanches.filter((avalanche) => matchesQuery(avalanche) && matchesPeriod(avalanche)),
  }
}

export default usePickerFilters
