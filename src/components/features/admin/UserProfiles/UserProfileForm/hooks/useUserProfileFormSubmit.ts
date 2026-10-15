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

  const handleSubmit = async ({ socialLinks, teamTitle, ...formData }: UserProfileFormSchema) => {
    try {
      await updateProfile({
        ...formData,
        id: profileId,
        // Without empty rows and repeats
        socialLinks: [...new Set(socialLinks.map(({ url }) => url).filter(Boolean))],
        teamTitle: teamTitle || null,
      })
      toastSuccess(t('admin.profile.messages.updated'))
      onSuccess()
    } catch (error) {
      toastError('UserProfileForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default useUserProfileFormSubmit
