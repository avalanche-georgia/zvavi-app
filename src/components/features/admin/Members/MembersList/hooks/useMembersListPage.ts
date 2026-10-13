'use client'

import { useMemo, useState } from 'react'
import { useMembersQuery } from '@data/hooks/members'

import useMembersListParams from './useMembersListParams'
import { countByStatus, filterMembers } from '../model'

// Everything the list page shows: all members, the filters and what they leave visible
const useMembersListPage = () => {
  const list = useMembersListParams()
  const [searchResetKey, setSearchResetKey] = useState(0)
  const membersQuery = useMembersQuery()
  const members = useMemo(() => membersQuery.data ?? [], [membersQuery.data])
  const { query, status } = list

  // Stable identities: the table re-sorts and re-paginates only when these change
  const visibleMembers = useMemo(
    () => filterMembers(members, { query, status }),
    [members, query, status],
  )
  const counts = useMemo(() => countByStatus(members), [members])

  const handleFiltersClear = () => {
    setSearchResetKey((key) => key + 1)
    list.onFiltersClear()
  }

  return {
    counts,
    list: { ...list, onFiltersClear: handleFiltersClear },
    members,
    membersQuery,
    searchResetKey,
    visibleMembers,
  }
}

export default useMembersListPage
