'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { Button, InputBlock, Textarea, TextInput } from '@components/ui'
import type { UserProfile } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { useUserProfileFormSubmit } from './hooks'

import { type UserProfileFormSchema, userProfileFormSchema } from './schema'

type UserProfileFormProps = {
  onCancel?: VoidFunction
  onSuccess?: VoidFunction
  profile: UserProfile | null
}

const UserProfileForm = ({ onCancel, onSuccess, profile }: UserProfileFormProps) => {
  const t = useTranslations()

  const form = useForm<UserProfileFormSchema>({
    defaultValues: {
      about: profile?.about ?? '',
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
    },
    resolver: zodResolver(userProfileFormSchema),
  })

  const {
    formState: { errors, isDirty },
    register,
  } = form

  useUnsavedChangesWarning(isDirty)

  const { handleSubmit } = useUserProfileFormSubmit({ onSuccess, profileId: profile?.id })

  const getError = (field: keyof UserProfileFormSchema) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputBlock
            error={getError('firstName')}
            label={t('admin.profile.form.labels.firstName')}
            required
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput {...register('firstName')} />
          </InputBlock>
          <InputBlock
            error={getError('lastName')}
            label={t('admin.profile.form.labels.lastName')}
            required
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput {...register('lastName')} />
          </InputBlock>
        </div>

        <InputBlock error={getError('about')} label={t('admin.profile.form.labels.about')}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Textarea {...register('about')} rows={4} />
        </InputBlock>

        <div className="ml-auto flex gap-3">
          {onCancel && (
            <Button onClick={onCancel} type="button" variant="secondary">
              {t('common.actions.cancel')}
            </Button>
          )}
          <Button type="submit">{t('common.actions.save')}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default UserProfileForm
