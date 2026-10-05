'use client'

import { useState, useTransition } from 'react'
import { useToast } from '@components/hooks'
import { useForecastDelete, useForecastStatusToggle } from '@data/hooks/forecasts'
import type { Forecast, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'
import { useCopyToClipboard } from 'usehooks-ts'

import useWriteErrorToast from './useWriteErrorToast'

import { routes } from '@/routes'

type ForecastRowActionsOptions = {
  // Where Edit was opened from; the form's Cancel / Save & close return there
  editFrom?: 'view'
  // The view page leaves for the list; the list needs nothing
  onDeleted?: VoidFunction
}

const useForecastRowActions = (
  { id }: Pick<Forecast, 'id'>,
  regionId: RegionId,
  { editFrom, onDeleted }: ForecastRowActionsOptions = {},
) => {
  const t = useTranslations()
  const router = useRouter()
  const [isEditNavigating, startEditNavigation] = useTransition()
  const [isDuplicateNavigating, startDuplicateNavigation] = useTransition()
  const { toastAction, toastError, toastSuccess } = useToast()
  const toastWriteError = useWriteErrorToast()
  const [, copyToClipboard] = useCopyToClipboard()
  const { isPending: isStatusChanging, mutateAsync: toggleStatus } = useForecastStatusToggle()
  const { isPending: isDeleting, mutateAsync: deleteForecast } = useForecastDelete()
  const [isPublishConfirmOpen, setIsPublishConfirmOpen] = useState(false)
  const publicPath = routes.forecastsByRegion(regionId).view(id)

  const setStatus = async (status: Forecast['status']) => {
    try {
      await toggleStatus({ forecastId: id, regionId, status })

      return true
    } catch (error) {
      toastWriteError('useForecastRowActions | setStatus', error)

      return false
    }
  }

  // Acts at once (optimistic row), then offers Undo
  const changeStatus = async (status: Forecast['status']) => {
    const isPublishing = status === 'published'

    if (!(await setStatus(status))) return

    toastAction(t(`admin.forecasts.messages.${isPublishing ? 'published' : 'unpublished'}`), {
      label: t('common.actions.undo'),
      onClick: () => void setStatus(isPublishing ? 'draft' : 'published'),
    })
  }

  const handleDelete = async () => {
    try {
      await deleteForecast({ forecastId: id, regionId })
      toastSuccess(t('admin.forecasts.messages.deleted'))
      onDeleted?.()
    } catch (error) {
      toastWriteError('useForecastRowActions | handleDelete', error)
    }
  }

  // Current environment's address (staging copies a staging link)
  const handleLinkCopy = async () => {
    const isCopied = await copyToClipboard(`${window.location.origin}${publicPath}`)

    if (!isCopied) return void toastError('useForecastRowActions | handleLinkCopy', {})
    toastSuccess(t('admin.forecasts.messages.linkCopied'))
  }

  const handleEdit = () =>
    startEditNavigation(() =>
      router.push(routes.admin.forecasts.editInRegion(id, regionId, editFrom)),
    )

  const handleDuplicate = () =>
    startDuplicateNavigation(() =>
      router.push(routes.admin.forecasts.duplicateInRegion(id, regionId)),
    )

  return {
    isDeleting,
    isDuplicateNavigating,
    isEditNavigating,
    isNavigating: isEditNavigating || isDuplicateNavigating,
    isStatusChanging,
    onDelete: handleDelete,
    onDuplicate: handleDuplicate,
    onEdit: handleEdit,
    onLinkCopy: handleLinkCopy,
    onPublicPageOpen: () => void window.open(publicPath, '_blank', 'noopener'),
    // Publishing is public at once, so it asks first; unpublishing doesn't
    onPublish: () => setIsPublishConfirmOpen(true),
    onUnpublish: () => changeStatus('draft'),
    publishConfirm: {
      isOpen: isPublishConfirmOpen,
      onConfirm: () => changeStatus('published'),
      onOpenChange: setIsPublishConfirmOpen,
    },
  }
}

export type ForecastRowActions = ReturnType<typeof useForecastRowActions>

export default useForecastRowActions
