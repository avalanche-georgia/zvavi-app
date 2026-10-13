'use client'

import { useMemo } from 'react'
import { useSearchReset } from '@components/features/admin/shared'
import { useAllPartnersQuery } from '@data/hooks/partners'

import usePartnersListParams from './usePartnersListParams'
import { countByStatus, filterPartners } from '../model'

// Everything the list page shows: all partners, the filters and what they leave visible
const usePartnersListPage = () => {
  const list = usePartnersListParams()
  const { onFiltersClear, searchResetKey } = useSearchReset(list.onFiltersClear)
  const partnersQuery = useAllPartnersQuery()
  const partners = useMemo(() => partnersQuery.data ?? [], [partnersQuery.data])
  const { query, status } = list

  // Stable identities: the table re-sorts and re-paginates only when these change
  const visiblePartners = useMemo(
    () => filterPartners(partners, { query, status }),
    [partners, query, status],
  )
  const counts = useMemo(() => countByStatus(partners), [partners])

  return {
    counts,
    list: { ...list, onFiltersClear },
    partners,
    partnersQuery,
    searchResetKey,
    visiblePartners,
  }
}

export default usePartnersListPage
