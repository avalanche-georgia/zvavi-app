import { useToast } from '@components/hooks'
import { useUserProfileUpdate } from '@data/hooks/userProfiles'
import { useTranslations } from 'next-intl'

import type { UserProfileFormSchema } from '../schema'

type UseUserProfileFormSubmitParams = {
  onSuccess: VoidFunction
  profileId: string
}

const useUserProfileFormSubmit = ({ onSuccess, profileId }: UseUserProfileFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: updateProfile } = useUserProfileUpdate()

  const handleSubmit = async (formData: UserProfileFormSchema) => {
    try {
      await updateProfile({ ...formData, id: profileId })
      toastSuccess(t('admin.profile.messages.updated'))
      onSuccess()
    } catch (error) {
      toastError('UserProfileForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default useUserProfileFormSubmit
