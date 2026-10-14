'use client'

import { ListEmptyState, useDataTableLabels } from '@components/features/admin/shared'
import type { Member } from '@domain/types'
import { DataTable } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { memberColumns } from './columns'
import MemberCard from './MemberCard'
import { MembersTableContext } from './MembersTableContext'
import type { MemberSheetMode } from '../../MemberSheet'
import type { MembersListState } from '../hooks'

type MembersTableProps = {
  hasMembers: boolean
  isLoading: boolean
  list: MembersListState
  members: Member[]
  onMemberOpen: (id: string, mode?: MemberSheetMode) => void
}

const getRowId = ({ id }: Member) => id
const renderCard = (member: Member) => <MemberCard member={member} />

const MembersTable = ({
  hasMembers,
  isLoading,
  list,
  members,
  onMemberOpen,
}: MembersTableProps) => {
  const t = useTranslations()
  const labels = useDataTableLabels()

  // Filters hide every row vs. there are no members at all
  const empty = hasMembers ? (
    <ListEmptyState
      hint={t('admin.members.empty.noMatchesHint')}
      onFiltersClear={list.onFiltersClear}
      title={t('admin.members.empty.noMatchesTitle')}
    />
  ) : (
    <ListEmptyState
      hint={t('admin.members.empty.noMembersHint')}
      title={t('admin.members.empty.noMembersTitle')}
    />
  )

  return (
    <MembersTableContext value={{ onMemberOpen }}>
      <DataTable
        ariaLabel={t('admin.members.list.ariaLabel')}
        columns={memberColumns}
        data={members}
        empty={empty}
        getRowId={getRowId}
        isLoading={isLoading}
        labels={labels}
        onPageChange={list.onPageChange}
        onSortChange={list.onSortChange}
        pageIndex={list.pageIndex}
        renderCard={renderCard}
        sort={{ desc: list.desc, id: list.sortKey }}
      />
    </MembersTableContext>
  )
}

export default MembersTable
