import type { Member } from '@domain/types'

import type { StatusFilter } from './listParams'
import { statusFilters } from './listParams'

type MemberFilters = { query: string; status: StatusFilter }

const matchesQuery = ({ email, firstName, lastName, memberId }: Member, query: string) =>
  [`${firstName} ${lastName}`, memberId, email ?? ''].some((text) =>
    text.toLowerCase().includes(query),
  )

export const filterMembers = (members: Member[], { query, status }: MemberFilters) => {
  const normalizedQuery = query.trim().toLowerCase()

  return members.filter(
    (member) =>
      (status === 'all' || member.status === status) &&
      (!normalizedQuery || matchesQuery(member, normalizedQuery)),
  )
}

// Per status-filter option, over all members
export const countByStatus = (members: Member[]) => {
  const counts = Object.fromEntries(statusFilters.map((status) => [status, 0])) as Record<
    StatusFilter,
    number
  >

  counts.all = members.length
  members.forEach(({ status }) => (counts[status] += 1))

  return counts
}
