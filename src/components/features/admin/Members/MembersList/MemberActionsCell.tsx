'use client'

import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { useMemberDelete } from '@data/hooks/members'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'
import ApproveDialog from './ApproveDialog'

import { routes } from '@/routes'

const MemberActionsCell = ({ member }: { member: Member }) => {
  const t = useTranslations()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)
  const [isApproveDialogOpen, { setFalse: closeApproveDialog, setTrue: openApproveDialog }] =
    useBoolean(false)
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: deleteMember } = useMemberDelete()

  const fullName = `${member.firstName} ${member.lastName}`
  const isPending = member.status === 'pending'

  const handleDelete = async () => {
    try {
      await deleteMember(member.id)
      toastSuccess(t('admin.members.messages.deleted'))
    } catch (error) {
      toastError('MemberActionsCell | handleDelete', { error })
    }
  }

  return (
    <>
      <ActionButtons
        editHref={routes.admin.members.edit(member.id)}
        isPending={isPending}
        memberId={member.memberId}
        onApprove={isPending ? openApproveDialog : undefined}
        onDelete={openDeletionDialog}
        verificationCode={member.verificationCode}
      />

      <ConfirmationDialog
        description={t('admin.members.deleteMemberModal.description', { name: fullName })}
        isOpen={isDeletionDialogOpen}
        onClose={closeDeletionDialog}
        onConfirm={handleDelete}
        title={t('admin.members.deleteMemberModal.title')}
        variant="delete"
      />

      <ApproveDialog isOpen={isApproveDialogOpen} member={member} onClose={closeApproveDialog} />
    </>
  )
}

export default MemberActionsCell
