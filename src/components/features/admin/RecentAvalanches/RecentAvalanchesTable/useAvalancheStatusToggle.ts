import { useToast } from '@components/hooks'
import { useRecentAvalancheUpdate } from '@data/hooks/recentAvalanches'
import type { AvalancheStatus, RegionId } from '@domain/types'

type UseAvalancheStatusToggleParams = {
  id: number
  regionId: RegionId
  status: AvalancheStatus
}

const useAvalancheStatusToggle = ({ id, regionId, status }: UseAvalancheStatusToggleParams) => {
  const { toastError } = useToast()
  const { isPending, mutate } = useRecentAvalancheUpdate()

  const toggleStatus = () =>
    mutate(
      { id, regionId, status: status === 'published' ? 'draft' : 'published' },
      { onError: (error) => toastError('useAvalancheStatusToggle | toggleStatus', { error }) },
    )

  return { isPending, toggleStatus }
}

export default useAvalancheStatusToggle
