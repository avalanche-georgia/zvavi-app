'use client'

import { Icon } from '@components/icons'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { getStatusToggle, useAvalancheStatusToggle } from '../hooks'

type ViewActionsProps = {
  avalanche: AvalancheListItem
  onDelete: VoidFunction
  onEdit: VoidFunction
}

// Quick status action + edit + delete. Archive / reject / restore go through
// the edit form's status field (local/observations/model.md).
const ViewActions = ({ avalanche, onDelete, onEdit }: ViewActionsProps) => {
  const t = useTranslations()
  const { id, status = 'published' } = avalanche
  const statusToggle = getStatusToggle(status)
  const { isPending, toggleStatus } = useAvalancheStatusToggle({ id, status })

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {statusToggle && (
        <Button
          disabled={isPending}
          onClick={toggleStatus}
          variant={status === 'published' ? 'secondary' : 'primary'}
        >
          <Icon icon={statusToggle.icon} size="sm" />
          {t(statusToggle.labelKey)}
        </Button>
      )}
      <Button onClick={onEdit} variant="secondary">
        <Icon icon="pencil" size="sm" />
        {t('common.actions.edit')}
      </Button>
      <Button className="ml-auto" onClick={onDelete} variant="secondary">
        <Icon icon="trash" size="sm" />
        {t('common.actions.delete')}
      </Button>
    </div>
  )
}

export default ViewActions
