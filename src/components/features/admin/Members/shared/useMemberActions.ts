'use client'

import { useToast } from '@components/hooks'
import { useMemberDelete } from '@data/hooks/members'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from 'usehooks-ts'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

type MemberActionsOptions = {
  // The sheet closes; the list needs nothing
  onDeleted?: VoidFunction
}

// What can be done with a member from its row menu or its sheet
const useMemberActions = (
  { id, memberId, verificationCode }: Pick<Member, 'id' | 'memberId' | 'verificationCode'>,
  { onDeleted }: MemberActionsOptions = {},
) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const [, copyToClipboard] = useCopyToClipboard()
  const { isPending: isDeleting, mutateAsync: deleteMember } = useMemberDelete()

  const handleDelete = async () => {
    try {
      await deleteMember(id)
      toastSuccess(t('admin.members.messages.deleted'))
      onDeleted?.()
    } catch (error) {
      toastError('useMemberActions | handleDelete', { error })
    }
  }

  const handleLinkCopy = async () => {
    const isCopied = await copyToClipboard(getVerificationUrl(verificationCode))

    if (!isCopied) return void toastError('useMemberActions | handleLinkCopy', {})
    toastSuccess(t('admin.members.messages.linkCopied'))
  }

  const handleQrDownload = async () => {
    try {
      await downloadQRCode(verificationCode, `member-qr-${memberId}`)
    } catch (error) {
      toastError('useMemberActions | handleQrDownload', { error })
    }
  }

  return {
    isDeleting,
    onDelete: handleDelete,
    onLinkCopy: handleLinkCopy,
    onQrDownload: handleQrDownload,
  }
}

export type MemberActions = ReturnType<typeof useMemberActions>

export default useMemberActions
