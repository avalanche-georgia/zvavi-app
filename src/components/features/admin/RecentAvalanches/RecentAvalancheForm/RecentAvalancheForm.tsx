'use client'

import { Spinner } from '@components/ui'
import { useRegionQuery } from '@data/hooks/regions'
import type { Avalanche, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import RecentAvalancheFormContent from './RecentAvalancheFormContent'

export type RecentAvalancheFormProps = {
  // undefined when creating a new record
  avalanche?: Avalanche & { id: number }
  // Panel variant: bare fields — the host (side panel) renders Cancel/Save
  // itself, submitting via `form={formId}`
  formId?: string
  onCancel: VoidFunction
  onDirtyChange?: (isDirty: boolean) => void
  // Panel variant: its Save button lives outside the form. True while saving
  // or while a save waits for photo uploads to finish.
  onSubmittingChange?: (isSubmitting: boolean) => void
  // Gets the new record's id after a create
  onSuccess: (createdId?: number) => void
  regionId: RegionId
  variant?: 'page' | 'panel'
}

// The map needs the full region (bounds, boundary) — the form opens once it's loaded
const RecentAvalancheForm = (props: RecentAvalancheFormProps) => {
  const t = useTranslations()
  const { data: region, isPending } = useRegionQuery({ regionId: props.regionId })

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (!region) {
    return <p className="text-muted px-4 py-12 text-center">{t('common.messages.error')}</p>
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RecentAvalancheFormContent {...props} region={region} />
}

export default RecentAvalancheForm
