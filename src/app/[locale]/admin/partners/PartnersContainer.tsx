'use client'

import {
  PartnerSheets,
  PartnersTable,
  PartnersToolbar,
  usePartnersListPage,
} from '@components/features/admin/Partners'
import {
  ListLoadError,
  useCreateSheetParam,
  useRecordSelection,
} from '@components/features/admin/shared'
import { AdminPageBody } from '@components/layout/admin'

const PartnersContainer = () => {
  const page = usePartnersListPage()
  const { list, partners, partnersQuery } = page
  const createSheet = useCreateSheetParam()
  const selection = useRecordSelection({ defaultMode: 'edit', param: 'partner' })
  const { selectedId } = selection

  // A failed background refetch keeps the data on screen; the error block is for first loads
  const isLoadFailed = partnersQuery.isError && !partnersQuery.data
  const selectedPartner = partners.find(({ id }) => id === selectedId) ?? null

  const handleRetry = () => void partnersQuery.refetch()

  return (
    <>
      <AdminPageBody>
        <PartnersToolbar
          counts={page.counts}
          list={list}
          onCreate={createSheet.openCreate}
          searchResetKey={page.searchResetKey}
        />
        {isLoadFailed ? (
          <ListLoadError onRetry={handleRetry} />
        ) : (
          <PartnersTable
            hasPartners={partners.length > 0}
            isLoading={partnersQuery.isPending}
            list={list}
            onPartnerOpen={selection.openRecord}
            partners={page.visiblePartners}
          />
        )}
      </AdminPageBody>

      <PartnerSheets
        isCreateRequested={createSheet.isCreateOpen}
        onCreateClose={createSheet.closeCreate}
        onEditClose={selection.closeRecord}
        partner={selectedPartner}
      />
    </>
  )
}

export default PartnersContainer
