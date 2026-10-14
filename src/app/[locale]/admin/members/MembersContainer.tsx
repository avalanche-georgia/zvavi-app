'use client'

import {
  MemberCreateSheet,
  MemberSheet,
  type MemberSheetMode,
  MembersTable,
  MembersToolbar,
  useMembersListPage,
} from '@components/features/admin/Members'
import {
  ListLoadError,
  useCreateSheetParam,
  useRecordSelection,
} from '@components/features/admin/shared'
import { AdminPageBody } from '@components/layout/admin'

// Opening a member closes the create sheet in the same navigation
const replacedParams = ['create']
const linkModes: MemberSheetMode[] = ['edit']

const MembersContainer = () => {
  const page = useMembersListPage()
  const { list, members, membersQuery } = page
  const createSheet = useCreateSheetParam()
  const selection = useRecordSelection<MemberSheetMode>({
    defaultMode: 'view',
    linkModes,
    param: 'member',
    replacedParams,
  })
  const { selectedId } = selection

  // A failed background refetch keeps the data on screen; the error block is for first loads
  const isLoadFailed = membersQuery.isError && !membersQuery.data
  const selectedMember = members.find(({ id }) => id === selectedId) ?? null

  const handleRetry = () => void membersQuery.refetch()

  return (
    <>
      <AdminPageBody>
        <MembersToolbar
          counts={page.counts}
          list={list}
          onCreate={createSheet.openCreate}
          searchResetKey={page.searchResetKey}
        />
        {isLoadFailed ? (
          <ListLoadError onRetry={handleRetry} />
        ) : (
          <MembersTable
            hasMembers={members.length > 0}
            isLoading={membersQuery.isPending}
            list={list}
            members={page.visibleMembers}
            onMemberOpen={selection.openRecord}
          />
        )}
      </AdminPageBody>

      <MemberSheet
        initialMode={selection.initialMode}
        isLoading={membersQuery.isPending}
        member={selectedMember}
        onClose={selection.closeRecord}
        onReopen={selection.reopenRecord}
        selectedId={selectedId}
      />
      <MemberCreateSheet
        isRequested={createSheet.isCreateOpen}
        onClose={createSheet.closeCreate}
        onCreated={selection.openRecord}
      />
    </>
  )
}

export default MembersContainer
