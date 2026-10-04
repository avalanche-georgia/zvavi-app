import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ProblemEditorFooterProps = {
  // Closing was requested with unsaved edits: ask before dropping them
  isConfirmingDiscard: boolean
  onCancel: VoidFunction
  onDiscard: VoidFunction
  onDone: VoidFunction
  onKeepEditing: VoidFunction
}

const ProblemEditorFooter = ({
  isConfirmingDiscard,
  onCancel,
  onDiscard,
  onDone,
  onKeepEditing,
}: ProblemEditorFooterProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor'

  if (isConfirmingDiscard) {
    return (
      <div className="flex w-full flex-wrap items-center gap-2" role="alert">
        <span className="text-copy-sm text-ink mr-auto font-semibold">
          {t(`${key}.actionBar.discardConfirm`)}
        </span>
        <Button onClick={onKeepEditing} size="sm" variant="secondary">
          {t(`${key}.actionBar.keepEditing`)}
        </Button>
        <Button className="bg-danger hover:bg-danger/90" onClick={onDiscard} size="sm">
          {t(`${key}.actionBar.discard`)}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <p className="text-caption text-muted mr-auto">{t(`${key}.problems.keptNote`)}</p>
      <Button onClick={onCancel} size="sm" variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button className="bg-ink hover:bg-ink/90" onClick={onDone} size="sm">
        {t(`${key}.problems.done`)}
      </Button>
    </div>
  )
}

export default ProblemEditorFooter
