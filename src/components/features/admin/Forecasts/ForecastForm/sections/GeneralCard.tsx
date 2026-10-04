import { FormTextField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ValidUntilField from './ValidUntilField'

const GeneralCard = ({ sectionId }: { sectionId: string }) => {
  const t = useTranslations()

  return (
    <FormCard sectionId={sectionId} title={t('admin.forecast.editor.general.title')}>
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 min-[620px]:grid-cols-2">
        <FormTextField
          label={t('admin.forecast.form.general.labels.forecaster')}
          name="forecaster"
          required
          requiredMessage={t('admin.forecast.editor.general.forecasterRequired')}
        />
        <ValidUntilField />
      </div>
    </FormCard>
  )
}

export default GeneralCard
