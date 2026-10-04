import { FooterActions } from '@ds/patterns'
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
      <FooterActions isConfirmation note={t(`${key}.actionBar.discardConfirm`)}>
        <Button onClick={onKeepEditing} variant="secondary">
          {t(`${key}.actionBar.keepEditing`)}
        </Button>
        <Button onClick={onDiscard} variant="danger">
          {t(`${key}.actionBar.discard`)}
        </Button>
      </FooterActions>
    )
  }

  return (
    <FooterActions note={t(`${key}.problems.keptNote`)}>
      <Button onClick={onCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button onClick={onDone}>{t(`${key}.problems.done`)}</Button>
    </FooterActions>
  )
}

export default ProblemEditorFooter
