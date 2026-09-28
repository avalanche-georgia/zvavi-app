import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'

import type { AvalancheSheetConfirm, AvalancheSheetMode, AvalancheSheetNavigation } from './types'
import useCloseOnStatusChange from './useCloseOnStatusChange'
import { useAvalancheDeleteDialog } from '../hooks'

type UseAvalancheSheetActionsParams = {
  avalanche: AvalancheListItem | null
  confirm: AvalancheSheetConfirm
  entryMode: AvalancheSheetMode
  hasUnsavedEdits: boolean
  id: number | null
  mode: AvalancheSheetMode
  navigation?: AvalancheSheetNavigation
  onClose: VoidFunction
  onRecordLeave?: VoidFunction
  setConfirm: (confirm: AvalancheSheetConfirm) => void
  setIsDirty: (isDirty: boolean) => void
  showView: VoidFunction
}

// Close / cancel / delete / keyboard stepping — anything that would drop
// unsaved edits asks first
const useAvalancheSheetActions = ({
  avalanche,
  confirm,
  entryMode,
  hasUnsavedEdits,
  id,
  mode,
  navigation,
  onClose,
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

  const { handleDelete, isDeleting } = useAvalancheDeleteDialog({
    id: avalanche?.id ?? 0,
    // Queue: move on like after approve / reject; catalog: close
    onSuccess: onRecordLeave ?? onClose,
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

  // ←/→ step through the list while viewing. Keys from stacked layers (map,
  // photo viewer) portal outside this popup but bubble here through React — ignore
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // No stepping while a delete runs — its completion acts on the open panel
    if (mode !== 'view' || !navigation || isDeleting) return

    // Alt+← is browser Back; a held key would step through the list
    if (event.altKey || event.metaKey || event.ctrlKey || event.repeat || event.defaultPrevented) {
      return
    }

    if (!event.currentTarget.contains(event.target as Node)) return
    if (event.key === 'ArrowLeft') navigation.onPrevious()
    if (event.key === 'ArrowRight') navigation.onNext()
  }

  return {
    handleConfirm,
    handleEditCancel,
    handleKeyDown,
    handleOpenChange,
    handleSaved: finishEdit,
    isDeleting,
  }
}

export default useAvalancheSheetActions
