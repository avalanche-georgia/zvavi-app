'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import type { UserProfile } from '@domain/types'
import { FormTextarea, FormTextField } from '@ds/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { useUserProfileFormSubmit } from './hooks'

import {
  teamTitleMaxLength,
  type UserProfileFormInput,
  type UserProfileFormSchema,
  userProfileFormSchema,
} from './schema'
import SocialLinksField from './SocialLinksField'
import InlineFormActions from '../InlineFormActions'

type UserProfileFormProps = {
  onCancel: VoidFunction
  onSuccess: VoidFunction
  profile: UserProfile
}

const UserProfileForm = ({ onCancel, onSuccess, profile }: UserProfileFormProps) => {
  const t = useTranslations()
  const { about, firstName, id, lastName, socialLinks, teamTitle } = profile

  const form = useForm<UserProfileFormInput, unknown, UserProfileFormSchema>({
    defaultValues: {
      about: about ?? '',
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      socialLinks: socialLinks.map((url) => ({ url })),
      teamTitle: teamTitle ?? '',
    },
    resolver: zodResolver(userProfileFormSchema),
  })
  const { isDirty, isSubmitting } = form.formState

  useUnsavedChangesWarning(isDirty)

  const { handleSubmit } = useUserProfileFormSubmit({ onSuccess, profileId: id })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 @md:grid-cols-2">
          <FormTextField<UserProfileFormInput>
            autoComplete="given-name"
            label={t('admin.profile.form.labels.firstName')}
            name="firstName"
            required
          />
          <FormTextField<UserProfileFormInput>
            autoComplete="family-name"
            label={t('admin.profile.form.labels.lastName')}
            name="lastName"
            required
          />
        </div>
        <FormTextField<UserProfileFormInput>
          description={t('admin.profile.form.hints.teamTitle')}
          label={t('admin.profile.form.labels.teamTitle')}
          maxLength={teamTitleMaxLength}
          name="teamTitle"
          placeholder={t('admin.profile.form.placeholders.teamTitle')}
          showCount
        />
        <FormTextarea<UserProfileFormInput>
          label={t('admin.profile.form.labels.about')}
          name="about"
        />
        <SocialLinksField />
        <InlineFormActions isSaving={isSubmitting} onCancel={onCancel} />
      </form>
    </FormProvider>
  )
}

export default UserProfileForm
