'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import type { Member, MemberStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

import Column from './Column'
import MemberFilters from './MemberFilters'
import MemberItem from './MemberItem'

import { routes } from '@/routes'

type MembersListProps = {
  members: Member[]
}

const MembersList = ({ members }: MembersListProps) => {
  const t = useTranslations()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<MemberStatus | ''>('')

  const filteredMembers = useMemo(() => {
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
      <ButtonLink className="mb-4 ml-auto" href={routes.admin.members.new}>
        <Icon icon="plus" size="sm" />
        {t('admin.members.title.create')}
      </ButtonLink>

      <MemberFilters
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        search={search}
        statusFilter={statusFilter}
      />

      <div className="w-full rounded border bg-white p-4 shadow">
        <div className="flex w-full items-center gap-4 rounded-t bg-gray-100 px-4 py-1.5">
          <Column className="w-48 font-semibold">{t('admin.members.list.columns.name')}</Column>
          <Column className="font-semibold">{t('admin.members.list.columns.memberId')}</Column>
          <Column className="font-semibold">{t('admin.members.list.columns.status')}</Column>
          <Column className="font-semibold">{t('admin.members.list.columns.joinedAt')}</Column>
          <Column className="font-semibold">{t('admin.members.list.columns.expiresAt')}</Column>
          <Column className="flex-1 pr-4 text-right font-semibold">
            {t('admin.members.list.columns.actions')}
          </Column>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="py-8 text-center text-gray-500">{t('admin.members.list.noMembers')}</div>
        ) : (
          <ul className="flex flex-col">
            {filteredMembers.map((member) => (
              <li key={member.id} className="border-b last:border-0">
                <MemberItem member={member} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default MembersList
