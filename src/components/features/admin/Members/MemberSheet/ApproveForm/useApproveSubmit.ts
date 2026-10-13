import { useToast } from '@components/hooks'
import { useMemberUpdate } from '@data/hooks/members'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { ApproveFormData } from './schema'
import { getMemberName } from '../../shared'

import { getVerificationUrl } from '@/lib/qrcode'

// Tells the member by email; a failed notification must not undo the approval
const notifyMember = (member: Member) => {
  if (!member.email) return

  void fetch('/api/notify/member-approved', {
    body: JSON.stringify({
      email: member.email,
      name: getMemberName(member),
      verificationUrl: getVerificationUrl(member.verificationCode),
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  }).catch(() => {})
}

const useApproveSubmit = (member: Member, onSuccess: VoidFunction) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: updateMember } = useMemberUpdate()

  const handleSubmit = async ({ expiresAt, joinedAt }: ApproveFormData) => {
    try {
      await updateMember({ expiresAt, id: member.id, joinedAt, status: 'active' })
      notifyMember(member)
      toastSuccess(t('admin.members.messages.approved'))
      onSuccess()
    } catch (error) {
      toastError('ApproveForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default useApproveSubmit
