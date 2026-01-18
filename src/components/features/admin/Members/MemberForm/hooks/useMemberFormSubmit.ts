import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useMemberCreate, useMemberUpdate } from '@data/hooks/members'
import type { Member, MemberFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

type UseMemberFormSubmitParams = {
  memberId?: string
  onSuccess: (createdMember?: Member) => void
}

const useMemberFormSubmit = ({ memberId, onSuccess }: UseMemberFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createMember } = useMemberCreate()
  const { mutateAsync: updateMember } = useMemberUpdate()

  const handleSubmit = useCallback(
    async (formData: MemberFormData) => {
      try {
        if (memberId) {
          await updateMember({ ...formData, id: memberId })
          toastSuccess(t('admin.members.messages.updated'))
          onSuccess()
        } else {
          const created = await createMember(formData)

          onSuccess(created)
        }
      } catch (error) {
        toastError('MemberForm | handleSubmit', { error })
      }
    },
    [memberId, createMember, updateMember, onSuccess, toastError, toastSuccess, t],
  )

  return { handleSubmit }
}

export default useMemberFormSubmit
