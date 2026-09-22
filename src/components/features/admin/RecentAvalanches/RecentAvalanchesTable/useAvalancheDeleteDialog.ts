import { useBoolean, useToast } from '@components/hooks'
import { useRecentAvalancheDelete } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'

type UseAvalancheDeleteDialogParams = {
  id: number
  regionId: RegionId
}

const useAvalancheDeleteDialog = ({ id, regionId }: UseAvalancheDeleteDialogParams) => {
  const { mutateAsync: deleteAvalanche } = useRecentAvalancheDelete()
  const [isOpen, { setFalse: closeDialog, setTrue: openDialog }] = useBoolean(false)
  const { toastError, toastSuccess } = useToast()

  const handleDelete = async () => {
    try {
      await deleteAvalanche({ id, regionId })
      closeDialog()
      toastSuccess()
    } catch (error) {
      toastError('AvalancheItem | handleDelete', { error })
    }
  }

  return { closeDialog, handleDelete, isOpen, openDialog }
}

export default useAvalancheDeleteDialog
