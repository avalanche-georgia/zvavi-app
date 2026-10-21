import { useToast } from '@components/hooks'
import { useRecentAvalancheDelete } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'

type UseAvalancheDeleteParams = {
  id: number
  // Runs after a successful delete — e.g. close the panel or leave the page
  onSuccess?: VoidFunction
  regionId: RegionId
}

const useAvalancheDelete = ({ id, onSuccess, regionId }: UseAvalancheDeleteParams) => {
  const { isPending: isDeleting, mutateAsync: deleteAvalanche } = useRecentAvalancheDelete()
  const { toastError, toastSuccess } = useToast()

  const handleDelete = async () => {
    if (isDeleting) return

    try {
      await deleteAvalanche({ id, regionId })
      toastSuccess()
      onSuccess?.()
    } catch (error) {
      toastError('useAvalancheDelete | handleDelete', { error })
      // Keeps the confirmation open, so it can be tried again
      throw error
    }
  }

  return { handleDelete, isDeleting }
}

export default useAvalancheDelete
