import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { defaultRegionId } from '@domain/constants'

import type { AvalancheSheetConfirm, AvalancheSheetMode, AvalancheSheetNavigation } from './types'
import useCloseOnStatusChange from './useCloseOnStatusChange'
import { useAvalancheDeleteDialog } from '../hooks'

type UseAvalancheSheetActionsParams = {
  avalanche: AvalancheListItem | null
  confirm: AvalancheSheetConfirm
  hasUnsavedEdits: boolean
  id: number | null
  mode: AvalancheSheetMode
  navigation?: AvalancheSheetNavigation
  onClose: VoidFunction
  onStatusChangeClose?: VoidFunction
  setConfirm: (confirm: AvalancheSheetConfirm) => void
  showView: VoidFunction
}

// Close / cancel / delete / keyboard stepping — anything that would drop
// unsaved edits asks first
const useAvalancheSheetActions = ({
  avalanche,
  confirm,
  hasUnsavedEdits,
  id,
  mode,
  navigation,
  onClose,
  onStatusChangeClose,
  setConfirm,
  showView,
}: UseAvalancheSheetActionsParams) => {
  useCloseOnStatusChange(
    id,
    avalanche,
    !!onStatusChangeClose && !hasUnsavedEdits,
    onStatusChangeClose ?? onClose,
  )

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

  // ←/→ step through the list while viewing. Keys from stacked layers (map,
  // photo viewer) portal outside this popup but bubble here through React — ignore
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (mode !== 'view' || !navigation) return
    if (!event.currentTarget.contains(event.target as Node)) return
    if (event.key === 'ArrowLeft') navigation.onPrevious()
    if (event.key === 'ArrowRight') navigation.onNext()
  }

  return { handleConfirm, handleEditCancel, handleKeyDown, handleOpenChange, isDeleting }
}

export default useAvalancheSheetActions
