'use client'

import { useMemo } from 'react'
import { useSearchReset } from '@components/features/admin/shared'
import { useMembersQuery } from '@data/hooks/members'

import useMembersListParams from './useMembersListParams'
import { countByStatus, filterMembers } from '../model'

// Everything the list page shows: all members, the filters and what they leave visible
const useMembersListPage = () => {
  const list = useMembersListParams()
  const { onFiltersClear, searchResetKey } = useSearchReset(list.onFiltersClear)
  const membersQuery = useMembersQuery()
  const members = useMemo(() => membersQuery.data ?? [], [membersQuery.data])
  const { query, status } = list

  // Stable identities: the table re-sorts and re-paginates only when these change
  const visibleMembers = useMemo(
    () => filterMembers(members, { query, status }),
    [members, query, status],
  )
  const counts = useMemo(() => countByStatus(members), [members])

  return {
    counts,
    list: { ...list, onFiltersClear },
    members,
    membersQuery,
    searchResetKey,
    visibleMembers,
  }
}

export default useMembersListPage
