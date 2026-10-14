import { FooterActions } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type FormSheetActionsProps = {
  // The form lives in the sheet body; the Save button submits it by id
  formId: string
  isSaving: boolean
  onCancel: VoidFunction
  saveLabel?: string
}

// Footer of a sheet holding a form: [Cancel] [Save]
const FormSheetActions = ({ formId, isSaving, onCancel, saveLabel }: FormSheetActionsProps) => {
  const t = useTranslations()

  return (
    <FooterActions>
      <Button onClick={onCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button form={formId} isBusy={isSaving} type="submit">
        {saveLabel ?? t('common.actions.save')}
      </Button>
    </FooterActions>
  )
}

export default FormSheetActions
