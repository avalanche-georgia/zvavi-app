import { useEffect, useState } from 'react'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { AvalancheStatus } from '@domain/types'

type OpenedStatus = { id: number; status: AvalancheStatus | undefined }

// The moderation queue only holds pending records: once the open record is
// approved or rejected it has left the queue, so the panel closes itself
// The baseline is the status seen when this panel session opened — reset on
// close, so reopening the record later (e.g. browser back) starts fresh
const useCloseOnStatusChange = (
  id: number | null,
  avalanche: AvalancheListItem | null,
  isEnabled: boolean,
  onClose: VoidFunction,
) => {
  const [openedStatus, setOpenedStatus] = useState<OpenedStatus | null>(null)

  if (id === null && openedStatus) setOpenedStatus(null)

  if (id !== null && avalanche?.id === id && openedStatus?.id !== id) {
    setOpenedStatus({ id, status: avalanche.status })
  }

  const hasStatusChanged =
    id !== null && avalanche?.id === openedStatus?.id && avalanche?.status !== openedStatus?.status

  useEffect(() => {
    if (isEnabled && hasStatusChanged) onClose()
  }, [hasStatusChanged, isEnabled, onClose])
}

export default useCloseOnStatusChange
