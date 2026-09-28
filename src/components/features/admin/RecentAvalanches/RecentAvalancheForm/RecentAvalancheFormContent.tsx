'use client'

import { useEffect } from 'react'
import { useSubmitAfterPhotoUploads } from '@components/features/observations/form'
import { useUnsavedChangesWarning } from '@components/hooks'
import type { Region } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import useRecentAvalancheFormSubmit from './hooks/useRecentAvalancheFormSubmit'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import PageFooter from './PageFooter'
import type { RecentAvalancheFormProps } from './RecentAvalancheForm'
import { type AvalancheFormData, type AvalancheFormSchema, avalancheFormSchema } from './schema'

import { cn } from '@/lib/utils'

type RecentAvalancheFormContentProps = RecentAvalancheFormProps & { region: Region }

const RecentAvalancheFormContent = ({
  avalanche,
  formId,
  onCancel,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
  region,
  regionId,
  variant = 'page',
}: RecentAvalancheFormContentProps) => {
  const form = useForm<AvalancheFormSchema, unknown, AvalancheFormData>({
    defaultValues: getInitialFormData(avalanche),
    resolver: zodResolver(avalancheFormSchema),
    // Focus + scroll on error is handled by useScrollToFirstError
    shouldFocusError: false,
  })

  const { isDirty, isSubmitting } = form.formState

  useUnsavedChangesWarning(isDirty)

  const { handleSubmit } = useRecentAvalancheFormSubmit({
    avalancheId: avalanche?.id,
    onSuccess,
    regionId,
  })
  const { formRef, handleFormSubmit, isWaitingForPhotos } = useSubmitAfterPhotoUploads({
    form,
    onValid: handleSubmit,
  })
  const isBusy = isSubmitting || isWaitingForPhotos

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    onSubmittingChange?.(isBusy)
  }, [isBusy, onSubmittingChange])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        ref={formRef}
        className={cn(
          '@container flex w-full flex-col gap-3',
          variant === 'panel' && 'bg-canvas p-3 md:p-4',
        )}
        id={formId}
        noValidate
        onSubmit={handleFormSubmit}
      >
        <FormFields avalanche={avalanche} region={region} />
        {variant === 'page' && <PageFooter isBusy={isBusy} onCancel={onCancel} />}
      </form>
    </FormProvider>
  )
}

export default RecentAvalancheFormContent
