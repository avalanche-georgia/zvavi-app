'use client'

import { useMemo, useState } from 'react'
import { MemberFilters, MembersList } from '@components/features/admin/Members/MembersList'
import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import { Spinner } from '@components/ui'
import { useMembersQuery } from '@data/hooks/members'
import type { MemberStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const MembersContainer = () => {
  const t = useTranslations()
  const { data: members, isPending } = useMembersQuery()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<MemberStatus | ''>('')

  const filteredMembers = useMemo(() => {
    if (!members) return []

    return members.filter((member) => {
      const searchLower = search.toLowerCase()
      const matchesSearch =
        !search ||
        member.firstName.toLowerCase().includes(searchLower) ||
        member.lastName.toLowerCase().includes(searchLower) ||
        member.memberId.toLowerCase().includes(searchLower) ||
        member.email?.toLowerCase().includes(searchLower)

      const matchesStatus = !statusFilter || member.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [members, search, statusFilter])

  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b bg-white px-4 py-3 md:px-6">
        <MemberFilters
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          search={search}
          statusFilter={statusFilter}
        />
        <ButtonLink href={routes.admin.members.new}>
          <Icon icon="plus" size="sm" />
          {t('admin.members.title.create')}
        </ButtonLink>
      </div>

      <div className="p-4 md:p-6">
        {isPending ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <MembersList members={filteredMembers} />
        )}
      </div>
    </>
  )
}

export default MembersContainer
