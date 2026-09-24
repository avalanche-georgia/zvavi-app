'use client'

import { useEffect } from 'react'
import { useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import type { Avalanche, RegionId } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import useRecentAvalancheCreateFormSubmit from './hooks/useRecentAvalancheCreateFormSubmit'
import useRecentAvalancheFormSubmit from './hooks/useRecentAvalancheFormSubmit'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import { type AvalancheFormSchema, getAvalancheFormSchema } from './schema'

type EditProps = {
  avalanche: Avalanche & { id: number }
  mode: 'edit'
}

type CreateProps = {
  avalanche?: never
  mode: 'create'
}

type RecentAvalancheFormProps = (EditProps | CreateProps) & {
  // Panel variant: bare fields — the host (side panel) renders Cancel/Save
  // itself, submitting via `form={formId}`
  formId?: string
  onCancel: VoidFunction
  onDirtyChange?: (isDirty: boolean) => void
  // Panel variant: its Save button lives outside the form
  onSubmittingChange?: (isSubmitting: boolean) => void
  onSuccess: VoidFunction
  regionId: RegionId
  variant?: 'page' | 'panel'
}

const RecentAvalancheForm = ({
  avalanche,
  formId,
  mode,
  onCancel,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
  regionId,
  variant = 'page',
}: RecentAvalancheFormProps) => {
  const t = useTranslations()

  const isLocationRequired =
    mode === 'create' || (avalanche.latitude !== null && avalanche.longitude !== null)

  const form = useForm<AvalancheFormSchema>({
    defaultValues: getInitialFormData(avalanche ?? {}),
    resolver: zodResolver(getAvalancheFormSchema(isLocationRequired)),
  })

  const { isDirty, isSubmitting } = form.formState

  useUnsavedChangesWarning(isDirty)

  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    onSubmittingChange?.(isSubmitting)
  }, [isSubmitting, onSubmittingChange])

  const { handleSubmit: handleEditSubmit } = useRecentAvalancheFormSubmit({
    avalancheId: avalanche?.id ?? 0,
    onSuccess,
    regionId,
  })

  const { handleSubmit: handleCreateSubmit } = useRecentAvalancheCreateFormSubmit({
    onSuccess,
    regionId,
  })

  const handleSubmit = mode === 'edit' ? handleEditSubmit : handleCreateSubmit

  const fields = (
    <form
      className="@container flex w-full flex-col gap-6"
      id={formId}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormFields avalanche={avalanche} isLocationRequired={isLocationRequired} />
    </form>
  )

  if (variant === 'panel') {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <FormProvider {...form}>
        <div className="p-4">{fields}</div>
      </FormProvider>
    )
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="rounded-lg bg-white shadow-sm">
        <section className="flex w-full flex-col gap-6 p-4 md:p-6">{fields}</section>

        <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
          <Button onClick={onCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button disabled={isSubmitting} onClick={form.handleSubmit(handleSubmit)}>
            {t('common.actions.save')}
          </Button>
        </footer>
      </div>
    </FormProvider>
  )
}

export default RecentAvalancheForm
