import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type InlineFormActionsProps = {
  isSaving: boolean
  onCancel: VoidFunction
}

// [Cancel] [Save] under a form edited in place, inside its card
const InlineFormActions = ({ isSaving, onCancel }: InlineFormActionsProps) => {
  const t = useTranslations()

  return (
    <div className="flex justify-end gap-2">
      <Button onClick={onCancel} size="sm" variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button isBusy={isSaving} size="sm" type="submit">
        {t('common.actions.save')}
      </Button>
    </div>
  )
}

export default InlineFormActions
