import { formatAvalancheId } from '@components/features/observations'
import { Button, IconButton } from '@ds/primitives'
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

  return (
    <div className="@max-[620px]:border-rule flex items-start gap-1.5 @max-[620px]:col-span-full @max-[620px]:justify-between @max-[620px]:border-t @max-[620px]:pt-2.5">
      <Button onClick={onEdit} size="sm" variant="secondary">
        <PanelRight aria-hidden className="size-4" />
        {t('admin.forecast.editor.avalanches.editRecord')}
      </Button>
      <IconButton
        aria-label={t('admin.forecast.editor.avalanches.remove', { id: formatAvalancheId(id) })}
        onClick={onRemove}
        tone="danger"
        tooltip={t('admin.forecast.editor.avalanches.unlinkAction')}
      >
        <Unlink className="size-4" />
      </IconButton>
    </div>
  )
}

export default LinkedAvalancheCardActions
