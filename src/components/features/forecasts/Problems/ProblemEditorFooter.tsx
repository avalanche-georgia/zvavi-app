import { FooterActions } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ProblemEditorFooterProps = {
  onCancel: VoidFunction
  onDone: VoidFunction
}

const ProblemEditorFooter = ({ onCancel, onDone }: ProblemEditorFooterProps) => {
  const t = useTranslations()

  return (
    <FooterActions note={t('admin.forecast.editor.problems.keptNote')}>
      <Button onClick={onCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button onClick={onDone}>{t('admin.forecast.editor.problems.done')}</Button>
    </FooterActions>
  )
}

export default ProblemEditorFooter
