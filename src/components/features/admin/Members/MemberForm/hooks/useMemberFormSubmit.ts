import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useMemberCreate, useMemberUpdate } from '@data/hooks/members'
import type { MemberFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

type UseMemberFormSubmitParams = {
  formData: MemberFormData
  memberId?: string
  onSuccess: VoidFunction
}

const useMemberFormSubmit = ({ formData, memberId, onSuccess }: UseMemberFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createMember } = useMemberCreate()
  const { mutateAsync: updateMember } = useMemberUpdate()

  const handleSubmit = useCallback(async () => {
    try {
      if (memberId) {
        await updateMember({ ...formData, id: memberId })
        toastSuccess(t('admin.members.messages.updated'))
      } else {
        await createMember(formData)
        toastSuccess(t('admin.members.messages.created'))
      }

      onSuccess()
    } catch (error) {
      toastError('MemberForm | handleSubmit', { error })
    }
  }, [formData, memberId, createMember, updateMember, onSuccess, toastError, toastSuccess, t])

  return { handleSubmit }
}

export default useMemberFormSubmit
