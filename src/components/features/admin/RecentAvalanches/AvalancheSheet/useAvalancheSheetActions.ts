import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'

import type { AvalancheSheetConfirm } from './types'
import { useAvalancheDeleteDialog } from '../hooks'

type UseAvalancheSheetActionsParams = {
  avalanche: AvalancheListItem | null
  confirm: AvalancheSheetConfirm
  hasUnsavedEdits: boolean
  onClose: VoidFunction
  setConfirm: (confirm: AvalancheSheetConfirm) => void
  showView: VoidFunction
}

// Close / cancel / delete — anything that would drop unsaved edits asks first
const useAvalancheSheetActions = ({
  avalanche,
  confirm,
  hasUnsavedEdits,
  onClose,
  setConfirm,
  showView,
}: UseAvalancheSheetActionsParams) => {
  const { handleDelete, isDeleting } = useAvalancheDeleteDialog({
    id: avalanche?.id ?? 0,
    onSuccess: onClose,
    regionId: avalanche?.regionId ?? defaultRegionId,
  })

  const closeWithoutSaving = () => {
    showView()
    onClose()
  }

  const handleCloseRequest = () => (hasUnsavedEdits ? setConfirm('close') : onClose())
  const handleEditCancel = () => (hasUnsavedEdits ? setConfirm('view') : showView())
  const handleOpenChange = (isOpen: boolean) => !isOpen && handleCloseRequest()

  const confirmActions = { close: closeWithoutSaving, delete: handleDelete, view: showView }

  const handleConfirm = () => {
    if (confirm) confirmActions[confirm]()
  }

  return { handleConfirm, handleEditCancel, handleOpenChange, isDeleting }
}

export default useAvalancheSheetActions
