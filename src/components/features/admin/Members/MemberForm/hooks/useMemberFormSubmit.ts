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

  const handleSubmit = async (formData: MemberFormData) => {
    try {
      if (memberId) {
        await updateMember({ ...formData, id: memberId })
        toastSuccess(t('admin.members.messages.updated'))
        onSuccess()

        return
      }

      const createdMember = await createMember(formData)

      toastSuccess(t('admin.members.messages.created'))
      onSuccess(createdMember)
    } catch (error) {
      toastError('MemberForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default useMemberFormSubmit
