'use client'

import { DataTable } from '@components/ui'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useMemberColumns } from './columns'

type MembersListProps = {
  isLoading?: boolean
  members: Member[]
}

const MembersList = ({ isLoading, members }: MembersListProps) => {
  const t = useTranslations()
  const columns = useMemberColumns()

  return (
    <DataTable
      className="max-h-[calc(100vh-14rem)]"
      columns={columns}
      data={members}
      emptyMessage={t('admin.members.list.noMembers')}
      getRowClassName={(row) => (row.original.status === 'pending' ? 'bg-primary/5' : undefined)}
      isLoading={isLoading}
    />
  )
}

export default MembersList
