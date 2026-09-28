import { IconButton, Tooltip } from '@components/ui'
import type { AvalancheStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

import { getStatusToggle } from '../hooks'

type ActionButtonsProps = {
  isTogglingStatus: boolean
  onDelete: VoidFunction
  onEdit: VoidFunction
  onStatusToggle: VoidFunction
  status: AvalancheStatus
}

const ActionButtons = ({
  isTogglingStatus,
  onDelete,
  onEdit,
  onStatusToggle,
  status,
}: ActionButtonsProps) => {
  const t = useTranslations()
  const statusToggle = getStatusToggle(status)

  return (
    <div className="flex items-center justify-end gap-2">
      {statusToggle && (
        <Tooltip content={t(statusToggle.labelKey)}>
          <IconButton
            disabled={isTogglingStatus}
            iconProps={{ icon: statusToggle.icon }}
            onClick={onStatusToggle}
          />
        </Tooltip>
      )}
      <Tooltip content={t('common.actions.edit')}>
        <IconButton iconProps={{ icon: 'pencil' }} onClick={onEdit} />
      </Tooltip>
      <Tooltip content={t('common.actions.delete')}>
        <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
      </Tooltip>
    </div>
  )
}

export default ActionButtons
