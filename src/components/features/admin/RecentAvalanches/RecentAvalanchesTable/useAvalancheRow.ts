import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { dateFormat } from '@domain/constants'
import type { RegionId } from '@domain/types'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { useAvalancheDeleteDialog, useAvalancheStatusToggle } from '../hooks'

// Shared by catalog and queue rows: quick actions + the occurred date label
const useAvalancheRow = (avalanche: AvalancheListItem, regionId: RegionId) => {
  const t = useTranslations()
  const { date, id, isDateUnknown, status = 'published' } = avalanche

  const { isPending: isTogglingStatus, toggleStatus } = useAvalancheStatusToggle({
    id,
    regionId,
    status,
  })
  const deleteDialog = useAvalancheDeleteDialog({ id, regionId })

  const dateDisplay =
    isDateUnknown || !date ? t('common.words.unknown') : format(new Date(date), dateFormat)

  return { dateDisplay, deleteDialog, isTogglingStatus, status, toggleStatus }
}

export default useAvalancheRow
