'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import type { UserProfile } from '@domain/types'
import { FormTextarea, FormTextField } from '@ds/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { useUserProfileFormSubmit } from './hooks'

import { type UserProfileFormSchema, userProfileFormSchema } from './schema'
import InlineFormActions from '../InlineFormActions'

type UserProfileFormProps = {
  onCancel: VoidFunction
  onSuccess: VoidFunction
  profile: UserProfile
}

const UserProfileForm = ({ onCancel, onSuccess, profile }: UserProfileFormProps) => {
  const t = useTranslations()
  const { about, firstName, id, lastName } = profile

  const form = useForm<UserProfileFormSchema>({
    defaultValues: { about: about ?? '', firstName: firstName ?? '', lastName: lastName ?? '' },
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
          <FormTextField<UserProfileFormSchema>
            autoComplete="given-name"
            label={t('admin.profile.form.labels.firstName')}
            name="firstName"
            required
          />
          <FormTextField<UserProfileFormSchema>
            autoComplete="family-name"
            label={t('admin.profile.form.labels.lastName')}
            name="lastName"
            required
          />
        </div>
        <FormTextarea<UserProfileFormSchema>
          label={t('admin.profile.form.labels.about')}
          name="about"
        />
        <InlineFormActions isSaving={isSubmitting} onCancel={onCancel} />
      </form>
    </FormProvider>
  )
}

export default UserProfileForm
