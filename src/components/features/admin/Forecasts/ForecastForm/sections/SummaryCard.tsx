import { FormTextarea } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

const SummaryCard = ({ sectionId }: { sectionId: string }) => {
  const t = useTranslations()

  return (
    <FormCard
      headerAside={t('admin.forecast.editor.summary.hint')}
      required
      requiredText={t('common.validation.required')}
      sectionId={sectionId}
      title={t('admin.forecast.form.general.labels.summary')}
    >
      <FormTextarea
        className="[&_textarea]:min-h-30"
        isLabelHidden
        label={t('admin.forecast.form.general.labels.summary')}
        name="summary"
        required
        requiredMessage={t('admin.forecast.editor.summary.required')}
      />
    </FormCard>
  )
}

export default SummaryCard
