'use client'

import { FormSheet } from '@components/features/admin/shared'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import { MemberForm } from './MemberForm'

type MemberCreateSheetProps = {
  isRequested: boolean
  onClose: VoidFunction
  // The new member opens next, so its QR code is at hand
  onCreated: (id: string) => void
}

const MemberCreateSheet = ({ isRequested, onClose, onCreated }: MemberCreateSheetProps) => {
  const t = useTranslations()

  return (
    <FormSheet
      isRequested={isRequested}
      isWide
      onClose={onClose}
      title={t('admin.members.title.create')}
    >
      {({ formId, onDirtyChange, onSubmittingChange, onSuccess }) => (
        <MemberForm
          formId={formId}
          onDirtyChange={onDirtyChange}
          onSubmittingChange={onSubmittingChange}
          onSuccess={(member?: Member) => onSuccess(member && (() => onCreated(member.id)))}
        />
      )}
    </FormSheet>
  )
}

export default MemberCreateSheet
