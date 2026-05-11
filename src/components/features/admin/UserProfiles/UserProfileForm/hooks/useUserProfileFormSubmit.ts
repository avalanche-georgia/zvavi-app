import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useUserProfileUpdate } from '@data/hooks/userProfiles'
import { useTranslations } from 'next-intl'

import type { UserProfileFormSchema } from '../schema'

type UseUserProfileFormSubmitParams = {
  profileId: string | undefined
  onSuccess?: VoidFunction
}

const useUserProfileFormSubmit = ({ onSuccess, profileId }: UseUserProfileFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: updateProfile } = useUserProfileUpdate()

  const handleSubmit = useCallback(
    async (formData: UserProfileFormSchema) => {
      if (!profileId) return

      try {
        await updateProfile({
          about: formData.about,
          firstName: formData.firstName,
          id: profileId,
          lastName: formData.lastName,
        })
        toastSuccess(t('admin.profile.messages.updated'))
        onSuccess?.()
      } catch (error) {
        toastError('UserProfileForm | handleSubmit', { error })
      }
    },
    [profileId, updateProfile, onSuccess, toastError, toastSuccess, t],
  )

  return { handleSubmit }
}

export default useUserProfileFormSubmit
