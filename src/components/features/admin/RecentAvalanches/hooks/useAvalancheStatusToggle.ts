import { useToast } from '@components/hooks'
import { useRecentAvalancheUpdate } from '@data/hooks/recentAvalanches'
import type { AvalancheStatus } from '@domain/types'

type UseAvalancheStatusToggleParams = {
  id: number
  status: AvalancheStatus
}

const useAvalancheStatusToggle = ({ id, status }: UseAvalancheStatusToggleParams) => {
  const { toastError } = useToast()
  const { isPending, mutate } = useRecentAvalancheUpdate()

  const toggleStatus = () =>
    mutate(
      { id, status: status === 'published' ? 'draft' : 'published' },
      { onError: (error) => toastError('useAvalancheStatusToggle | toggleStatus', { error }) },
    )

  return { isPending, toggleStatus }
}

export default useAvalancheStatusToggle
