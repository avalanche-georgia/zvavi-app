'use client'

import {
  FormSheetActions,
  type RecordSheetConfirm,
  RecordSheetFooter,
} from '@components/features/admin/shared'
import { getMemberName } from '@domain/memberName'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { MemberSheetMode } from './types'
import ViewActions from './ViewActions'
import { useMemberActions } from '../shared'

type MemberSheetFooterProps = {
  confirm: RecordSheetConfirm
  formId: string
  isSaving: boolean
  member: Member
  mode: MemberSheetMode
  onConfirmCancel: VoidFunction
  onDeleted: VoidFunction
  onDeleteRequest: VoidFunction
  onDiscard: VoidFunction
  onFormCancel: VoidFunction
  onModeChange: (mode: MemberSheetMode) => void
}

const MemberSheetFooter = ({
  confirm,
  formId,
  isSaving,
  member,
  mode,
  onConfirmCancel,
  onDeleteRequest,
  onDeleted,
  onDiscard,
  onFormCancel,
  onModeChange,
}: MemberSheetFooterProps) => {
  const t = useTranslations()
  const { onDelete } = useMemberActions(member, { onDeleted })

  return (
    <RecordSheetFooter
      confirm={confirm}
      deleteMessage={t('admin.members.deleteMessage', { name: getMemberName(member) })}
      deleteTitle={t('admin.members.deleteTitle', { name: getMemberName(member) })}
      onConfirmCancel={onConfirmCancel}
      onDelete={onDelete}
      onDiscard={onDiscard}
    >
      {mode === 'view' ? (
        <ViewActions
          member={member}
          onApprove={() => onModeChange('approve')}
          onDelete={onDeleteRequest}
          onEdit={() => onModeChange('edit')}
        />
      ) : (
        <FormSheetActions
          formId={formId}
          isSaving={isSaving}
          onCancel={onFormCancel}
          saveLabel={mode === 'approve' ? t('admin.members.actions.approve') : undefined}
        />
      )}
    </RecordSheetFooter>
  )
}

export default MemberSheetFooter
