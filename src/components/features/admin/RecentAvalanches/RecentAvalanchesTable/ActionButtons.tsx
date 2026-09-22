import { IconButton, Tooltip } from '@components/ui'
import type { AvalancheStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

type ActionButtonsProps = {
  editHref: string
  isTogglingStatus: boolean
  onDelete: VoidFunction
  onTogglePublish: VoidFunction
  status: AvalancheStatus
}

const ActionButtons = ({
  editHref,
  isTogglingStatus,
  onDelete,
  onTogglePublish,
  status,
}: ActionButtonsProps) => {
  const t = useTranslations()

  return (
    <div className="flex items-center justify-end gap-2">
      {status !== 'archived' && (
        <Tooltip
          content={t(
            status === 'published'
              ? 'admin.recentAvalanches.actions.unpublish'
              : 'admin.recentAvalanches.actions.publish',
          )}
        >
          <IconButton
            disabled={isTogglingStatus}
            iconProps={{ icon: status === 'published' ? 'eyeOff' : 'eye' }}
            onClick={onTogglePublish}
          />
        </Tooltip>
      )}
      <Tooltip content={t('common.actions.edit')}>
        <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
      </Tooltip>
      <Tooltip content={t('common.actions.delete')}>
        <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
      </Tooltip>
    </div>
  )
}

export default ActionButtons
