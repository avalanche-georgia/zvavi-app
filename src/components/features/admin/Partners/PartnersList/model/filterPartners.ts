import type { Partner } from '@domain/types'

import type { StatusFilter } from './listParams'

type PartnerFilters = { query: string; status: StatusFilter }

const matchesQuery = ({ nameEn, nameKa }: Partner, query: string) =>
  [nameEn, nameKa ?? ''].some((name) => name.toLowerCase().includes(query))

const matchesStatus = ({ isActive }: Partner, status: StatusFilter) =>
  status === 'all' || (status === 'active') === isActive

export const filterPartners = (partners: Partner[], { query, status }: PartnerFilters) => {
  const normalizedQuery = query.trim().toLowerCase()

  return partners.filter(
    (partner) =>
      matchesStatus(partner, status) &&
      (!normalizedQuery || matchesQuery(partner, normalizedQuery)),
  )
}

// Per status-filter option, over all partners
export const countByStatus = (partners: Partner[]): Record<StatusFilter, number> => {
  const active = partners.filter(({ isActive }) => isActive).length

  return { active, all: partners.length, inactive: partners.length - active }
}
