import { useBoolean, useToast } from '@components/hooks'
import { useRecentAvalancheDelete } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'

type UseAvalancheDeleteDialogParams = {
  id: number
  // Runs after a successful delete — e.g. close the panel or leave the page
  onSuccess?: VoidFunction
  regionId: RegionId
}

const useAvalancheDeleteDialog = ({ id, onSuccess, regionId }: UseAvalancheDeleteDialogParams) => {
  const { isPending: isDeleting, mutateAsync: deleteAvalanche } = useRecentAvalancheDelete()
  const [isOpen, { setFalse: closeDialog, setTrue: openDialog }] = useBoolean(false)
  const { toastError, toastSuccess } = useToast()

  const handleDelete = async () => {
    if (isDeleting) return

    try {
      await deleteAvalanche({ id, regionId })
      closeDialog()
      toastSuccess()
      onSuccess?.()
    } catch (error) {
      toastError('AvalancheItem | handleDelete', { error })
    }
  }

  return { closeDialog, handleDelete, isDeleting, isOpen, openDialog }
}

export default useAvalancheDeleteDialog
