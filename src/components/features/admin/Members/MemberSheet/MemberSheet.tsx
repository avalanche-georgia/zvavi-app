'use client'

import { useId } from 'react'
import { SheetHeader, useRecordSheet } from '@components/features/admin/shared'
import { Sheet } from '@components/ui'
import type { Member } from '@domain/types'

import MemberSheetBody from './MemberSheetBody'
import MemberSheetFooter from './MemberSheetFooter'
import type { MemberSheetMode } from './types'
import { getMemberName } from '../shared'

type MemberSheetProps = {
  initialMode: MemberSheetMode
  isLoading: boolean
  // The selected member, once found in the list
  member: Member | null
  onClose: VoidFunction
  onReopen: (id: string) => void
  selectedId: string | null
}

// One member, viewed, edited and approved in place
const MemberSheet = ({
  initialMode,
  isLoading,
  member,
  onClose,
  onReopen,
  selectedId,
}: MemberSheetProps) => {
  const formId = useId()
  const sheet = useRecordSheet<Member, MemberSheetMode>({
    initialMode,
    onClose,
    onReopen,
    record: member,
    selectedId,
  })
  const { mode, record } = sheet

  return (
    <Sheet
      footer={
        record && (
          <MemberSheetFooter
            confirm={sheet.confirm}
            formId={formId}
            isSaving={sheet.isSaving}
            member={record}
            mode={mode}
            onConfirmCancel={sheet.cancelConfirm}
            onDeleteRequest={sheet.requestDelete}
            onDeleted={sheet.close}
            onDiscard={sheet.discard}
            onFormCancel={sheet.cancelForm}
            onModeChange={sheet.setMode}
          />
        )
      }
      header={<SheetHeader title={record ? getMemberName(record) : ''} />}
      isDismissible={!sheet.hasUnsavedInput}
      isOpen={sheet.isOpen}
      isTall
      onOpenChange={sheet.onOpenChange}
    >
      <MemberSheetBody
        // A fresh form per record and per mode
        key={`${record?.id}-${mode}`}
        formId={formId}
        isLoading={isLoading}
        member={record}
        mode={mode}
        onDirtyChange={sheet.setIsDirty}
        onSaved={sheet.finishForm}
        onSubmittingChange={sheet.setIsSaving}
      />
    </Sheet>
  )
}

export default MemberSheet
