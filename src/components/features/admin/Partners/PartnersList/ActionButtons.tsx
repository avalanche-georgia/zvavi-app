import { IconButton, Tooltip } from '@components/ui'
import { useTranslations } from 'next-intl'

type ActionButtonsProps = {
  editHref: string
  onDelete: VoidFunction
}

const ActionButtons = ({ editHref, onDelete }: ActionButtonsProps) => {
  const t = useTranslations()

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip content={t('admin.partners.actions.edit')}>
        <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
      </Tooltip>
      <Tooltip content={t('admin.partners.actions.delete')}>
        <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
      </Tooltip>
    </div>
  )
}

export default ActionButtons
