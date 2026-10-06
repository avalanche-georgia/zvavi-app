import { Button } from '@ds/primitives'
import { Link2, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

type LinkedAvalanchesActionsProps = {
  onAddExisting: VoidFunction
  onCreate: VoidFunction
}

// Two separate buttons: linking and creating have different consequences
const LinkedAvalanchesActions = ({ onAddExisting, onCreate }: LinkedAvalanchesActionsProps) => {
  const t = useTranslations()

  return (
    <>
      <Button onClick={onAddExisting} size="sm" variant="secondary">
        <Link2 aria-hidden className="size-4" />
        {t('admin.forecast.editor.avalanches.addExisting')}
      </Button>
      <Button onClick={onCreate} size="sm" variant="secondary">
        <Plus aria-hidden className="size-4" />
        {t('admin.forecast.editor.avalanches.createNew')}
      </Button>
    </>
  )
}

export default LinkedAvalanchesActions
