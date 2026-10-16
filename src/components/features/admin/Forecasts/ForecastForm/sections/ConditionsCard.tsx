import FormattingInfo from '@components/features/forecasts/FormattingInfo'
import { FormTextarea } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

const ConditionsCard = ({ sectionId }: { sectionId: string }) => {
  const t = useTranslations()
  const labelKey = 'admin.forecast.form.general.labels'

  return (
    <FormCard sectionId={sectionId} title={t('admin.forecast.editor.conditions.title')}>
      <div className="grid grid-cols-1 gap-4 min-[620px]:grid-cols-2">
        <FormTextarea
          label={t(`${labelKey}.snowpack`)}
          labelAside={<FormattingInfo />}
          name="snowpack"
        />
        <FormTextarea
          label={t(`${labelKey}.weather`)}
          labelAside={<FormattingInfo />}
          name="weather"
        />
      </div>
      <FormTextarea
        className="[&_textarea]:min-h-24"
        label={t(`${labelKey}.additionalHazards`)}
        labelAside={<FormattingInfo />}
        name="additionalHazards"
      />
    </FormCard>
  )
}

export default ConditionsCard
