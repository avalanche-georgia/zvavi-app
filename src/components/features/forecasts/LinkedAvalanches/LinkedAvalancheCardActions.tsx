import { formatAvalancheId } from '@components/features/observations'
import { Button, ConfirmPopover, IconButton } from '@ds/primitives'
import { PanelRight, Unlink } from 'lucide-react'
import { useTranslations } from 'next-intl'

type LinkedAvalancheCardActionsProps = {
  id: number
  onEdit: VoidFunction
  onRemove: VoidFunction
}

// Deliberately different weights: editing is a labelled action, unlinking a quiet icon
const LinkedAvalancheCardActions = ({ id, onEdit, onRemove }: LinkedAvalancheCardActionsProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.avalanches'

  return (
    <div className="@max-[620px]:border-rule flex items-start gap-1.5 @max-[620px]:justify-between @max-[620px]:border-t @max-[620px]:pt-2.5">
      <Button onClick={onEdit} size="sm" variant="secondary">
        <PanelRight aria-hidden className="size-4" />
        {t(`${key}.editRecord`)}
      </Button>
      <ConfirmPopover
        cancelLabel={t('common.actions.cancel')}
        confirmLabel={t(`${key}.unlinkAction`)}
        message={t(`${key}.unlinkConfirm`, { id: formatAvalancheId(id) })}
        onConfirm={onRemove}
      >
        <IconButton
          aria-label={t(`${key}.remove`, { id: formatAvalancheId(id) })}
          tone="danger"
          tooltip={t(`${key}.unlinkAction`)}
        >
          <Unlink className="size-4" />
        </IconButton>
      </ConfirmPopover>
    </div>
  )
}

export default LinkedAvalancheCardActions
