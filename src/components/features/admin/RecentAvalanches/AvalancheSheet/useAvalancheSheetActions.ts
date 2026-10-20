import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'

import type { AvalancheSheetConfirm, AvalancheSheetMode } from './types'
import useCloseOnStatusChange from './useCloseOnStatusChange'
import { useAvalancheDelete } from '../hooks'

type UseAvalancheSheetActionsParams = {
  avalanche: AvalancheListItem | null
  confirm: AvalancheSheetConfirm
  entryMode: AvalancheSheetMode
  hasUnsavedEdits: boolean
  id: number | null
  onClose: VoidFunction
  onDeleted?: (id: number) => void
  onRecordLeave?: VoidFunction
  setConfirm: (confirm: AvalancheSheetConfirm) => void
  setIsDirty: (isDirty: boolean) => void
  showView: VoidFunction
}

// Close / cancel / delete — anything that would drop
// unsaved edits asks first
const useAvalancheSheetActions = ({
  avalanche,
  confirm,
  entryMode,
  hasUnsavedEdits,
  id,
  onClose,
  onDeleted,
  onRecordLeave,
  setConfirm,
  setIsDirty,
  showView,
}: UseAvalancheSheetActionsParams) => {
  useCloseOnStatusChange(
    id,
    avalanche,
    !!onRecordLeave && !hasUnsavedEdits,
    onRecordLeave ?? onClose,
  )

  // Queue: move on like after approve / reject; catalog: close
  const leave = onRecordLeave ?? onClose

  const handleDeleted = () => {
    if (avalanche) onDeleted?.(avalanche.id)
    setConfirm(null)
    leave()
  }

  const { handleDelete, isDeleting } = useAvalancheDelete({
    id: avalanche?.id ?? 0,
    onSuccess: handleDeleted,
    regionId: avalanche?.regionId ?? defaultRegionId,
  })

  const closeWithoutSaving = () => {
    showView()
    onClose()
  }

  // Stays in edit mode while sliding out — flipping to the view first would
  // flash it on the way out
  const closeFromEdit = () => {
    setIsDirty(false)
    setConfirm(null)
    onClose()
  }

  // Saved or cancelled: back to the view if the edit started there, otherwise
  // (opened straight into edit, e.g. the row's edit button) the panel closes
  const finishEdit = () => (entryMode === 'edit' ? closeFromEdit() : showView())

  const handleCloseRequest = () => (hasUnsavedEdits ? setConfirm('close') : onClose())
  const handleEditCancel = () => (hasUnsavedEdits ? setConfirm('view') : finishEdit())
  const handleOpenChange = (isOpen: boolean) => !isOpen && handleCloseRequest()

  const confirmActions = { close: closeWithoutSaving, delete: handleDelete, view: finishEdit }

  const handleConfirm = () => {
    if (confirm) confirmActions[confirm]()
  }

  return {
    handleConfirm,
    handleEditCancel,
    handleOpenChange,
    handleSaved: finishEdit,
    isDeleting,
  }
}

export default useAvalancheSheetActions
