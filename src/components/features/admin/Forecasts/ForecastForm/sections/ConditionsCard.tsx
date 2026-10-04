import { FormTextarea } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

const ConditionsCard = ({ sectionId }: { sectionId: string }) => {
  const t = useTranslations()
  const labelKey = 'admin.forecast.form.general.labels'

  return (
    <FormCard sectionId={sectionId} title={t('admin.forecast.editor.conditions.title')}>
      <div className="grid grid-cols-1 gap-4 min-[620px]:grid-cols-2">
        <FormTextarea label={t(`${labelKey}.snowpack`)} name="snowpack" />
        <FormTextarea label={t(`${labelKey}.weather`)} name="weather" />
      </div>
      <FormTextarea
        className="[&_textarea]:min-h-24"
        label={t(`${labelKey}.additionalHazards`)}
        name="additionalHazards"
      />
    </FormCard>
  )
}

export default ConditionsCard
