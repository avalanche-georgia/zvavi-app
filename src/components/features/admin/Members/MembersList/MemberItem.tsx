import { useBoolean, useToast } from '@components/hooks'
import { ConfirmationDialog } from '@components/shared'
import { useMemberDelete } from '@data/hooks/members'
import { dateFormat } from '@domain/constants'
import type { Member } from '@domain/types'
import { format, isAfter, parseISO, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'
import { cn } from 'src/lib/utils'

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

  const { expiresAt, id, joinedAt, memberId, status, verificationCode } = member

  const handleDelete = async () => {
    try {
      await deleteMember(id)
      toastSuccess(t('admin.members.messages.deleted'))
    } catch (error) {
      toastError('MemberItem | handleDelete', { error })
    }
  }

  const fullName = `${member.firstName} ${member.lastName}`
  const formattedJoinedAt = format(joinedAt, dateFormat)
  const formattedExpiresAt = expiresAt ? format(expiresAt, dateFormat) : '-'
  const isExpired = expiresAt && isAfter(startOfDay(new Date()), startOfDay(parseISO(expiresAt)))
  const isPending = status === 'pending'

  return (
    <>
      <div className={cn('flex h-12 items-center gap-4 px-4', { 'bg-primary/5': isPending })}>
        <Column className="w-56">
          <Link className="hover:text-primary hover:underline" href={routes.admin.members.view(id)}>
            {fullName}
          </Link>
        </Column>
        <Column>{memberId}</Column>
        <Column>
          <StatusBadge status={status} />
        </Column>
        <Column>{formattedJoinedAt}</Column>
        <Column className={cn(isExpired && 'font-medium text-red-600')}>
          {formattedExpiresAt}
        </Column>
        <Column className="flex-1 pr-4 text-right">
          <ActionButtons
            editHref={routes.admin.members.edit(id)}
            isPending={isPending}
            memberId={memberId}
            onApprove={openApproveDialog}
            onDelete={openDeletionDialog}
            verificationCode={verificationCode}
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
