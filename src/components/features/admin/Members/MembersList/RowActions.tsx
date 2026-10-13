'use client'

import { RecordMenu } from '@components/features/admin/shared'
import type { Member } from '@domain/types'
import { IconButton, MenuItem } from '@ds/primitives'
import { Download, Link2, Pencil, UserRoundCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { MemberSheetMode } from '../MemberSheet'
import { getMemberName, useMemberActions } from '../shared'

type RowActionsProps = {
  // Card layout: ⋯ only
  isCompact?: boolean
  member: Member
  onOpen: (id: string, mode?: MemberSheetMode) => void
}

const RowActions = ({ isCompact = false, member, onOpen }: RowActionsProps) => {
  const t = useTranslations()
  const actions = useMemberActions(member)
  const { id, status } = member
  const name = getMemberName(member)
  const isPending = status === 'pending'

  const handleApprove = () => onOpen(id, 'approve')
  const handleEdit = () => onOpen(id, 'edit')

  return (
    <div className="flex items-center justify-end gap-1">
      {isPending && !isCompact && (
        <IconButton
          aria-label={t('admin.members.actions.approveMember', { name })}
          onClick={handleApprove}
          tooltip={t('admin.members.actions.approve')}
        >
          <UserRoundCheck className="size-4.5" />
        </IconButton>
      )}
      <RecordMenu
        deleteMessage={t('admin.members.deleteConfirm', { name })}
        label={t('admin.members.actions.moreForMember', { name })}
        onDelete={actions.onDelete}
      >
        {isPending && isCompact && (
          <MenuItem icon={<UserRoundCheck />} onClick={handleApprove}>
            {t('admin.members.actions.approve')}
          </MenuItem>
        )}
        <MenuItem icon={<Pencil />} onClick={handleEdit}>
          {t('common.actions.edit')}
        </MenuItem>
        <MenuItem icon={<Link2 />} onClick={actions.onLinkCopy}>
          {t('admin.members.actions.copyLink')}
        </MenuItem>
        <MenuItem icon={<Download />} onClick={actions.onQrDownload}>
          {t('admin.members.qrCode.download')}
        </MenuItem>
      </RecordMenu>
    </div>
  )
}

export default RowActions
