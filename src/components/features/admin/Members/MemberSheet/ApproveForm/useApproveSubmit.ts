import { useToast } from '@components/hooks'
import { useMemberUpdate } from '@data/hooks/members'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { ApproveFormData } from './schema'
import { getMemberName } from '../../shared'

import { getVerificationUrl } from '@/lib/qrcode'

// Tells the member by email. Resolves to whether it went out; a failed
// notification must not undo the approval.
const notifyMember = async ({ email, ...member }: Member & { email: string }) => {
  try {
    const response = await fetch('/api/notify/member-approved', {
      body: JSON.stringify({
        email,
        name: getMemberName(member),
        verificationUrl: getVerificationUrl(member.verificationCode),
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    return response.ok
  } catch {
    return false
  }
}

const useApproveSubmit = (member: Member, onSuccess: VoidFunction) => {
  const t = useTranslations()
  const { toastError, toastInfo, toastSuccess } = useToast()
  const { mutateAsync: updateMember } = useMemberUpdate()

  // Doesn't hold up the sheet: the admin hears about a failed email afterwards
  const notifyApprovedMember = () => {
    const { email } = member

    if (!email) return

    void notifyMember({ ...member, email }).then((isSent) => {
      if (!isSent) toastInfo(t('admin.members.messages.approvalEmailFailed'))
    })
  }

  const handleSubmit = async ({ expiresAt, joinedAt }: ApproveFormData) => {
    try {
      await updateMember({ expiresAt, id: member.id, joinedAt, status: 'active' })
      notifyApprovedMember()
      toastSuccess(t('admin.members.messages.approved'))
      onSuccess()
    } catch (error) {
      toastError('ApproveForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default useApproveSubmit
