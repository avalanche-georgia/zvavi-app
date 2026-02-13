import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { useMemberDelete } from '@data/hooks/members'
import { dateFormat } from '@domain/constants'
import type { Member } from '@domain/types'
import clsx from 'clsx'
import { format, isAfter, parseISO, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'

import ActionButtons from './ActionButtons'
import ApproveDialog from './ApproveDialog'
import Column from './Column'
import StatusBadge from './StatusBadge'

import { routes } from '@/routes'

type MemberItemProps = {
  member: Member
}

const MemberItem = ({ member }: MemberItemProps) => {
  const t = useTranslations()
  const { mutateAsync: deleteMember } = useMemberDelete()
  const [isDeletionDialogOpen, { setFalse: closeDeletionDialog, setTrue: openDeletionDialog }] =
    useBoolean(false)
  const [isApproveDialogOpen, { setFalse: closeApproveDialog, setTrue: openApproveDialog }] =
    useBoolean(false)
  const { toastError, toastSuccess } = useToast()

  const handleDelete = async () => {
    try {
      await deleteMember(member.id)
      toastSuccess(t('admin.members.messages.deleted'))
    } catch (error) {
      toastError('MemberItem | handleDelete', { error })
    }
  }

  const fullName = `${member.firstName} ${member.lastName}`
  const formattedJoinedAt = format(member.joinedAt, dateFormat)
  const formattedExpiresAt = member.expiresAt ? format(member.expiresAt, dateFormat) : '-'
  const isExpired =
    member.expiresAt && isAfter(startOfDay(new Date()), startOfDay(parseISO(member.expiresAt)))
  const isPending = member.status === 'pending'

  return (
    <>
      <div className={clsx('flex h-12 items-center gap-4 px-4', { 'bg-primary/5': isPending })}>
        <Column className="w-48">{fullName}</Column>
        <Column>{member.memberId}</Column>
        <Column>
          <StatusBadge status={member.status} />
        </Column>
        <Column>{formattedJoinedAt}</Column>
        <Column className={clsx(isExpired && 'font-medium text-red-600')}>
          {formattedExpiresAt}
        </Column>
        <Column className="flex-1 pr-4 text-right">
          <ActionButtons
            editHref={routes.admin.members.edit(member.id)}
            isPending={isPending}
            memberId={member.memberId}
            onApprove={openApproveDialog}
            onDelete={openDeletionDialog}
            verificationCode={member.verificationCode}
          />
        </Column>
      </div>

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

export default MemberItem
