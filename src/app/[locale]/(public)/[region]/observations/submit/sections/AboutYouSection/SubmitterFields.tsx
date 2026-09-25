import { FormCheckbox, FormTextField } from '@ds/form'
import { InfoTip } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import ForgetDetailsNote from './ForgetDetailsNote'
import type { ObservationSubmitFormSchema } from '../../schema'

// `onForget` is passed only while details are remembered on this device
const SubmitterFields = ({ onForget }: { onForget?: () => void }) => {
  const t = useTranslations()

  return (
    <>
      <FormTextField<ObservationSubmitFormSchema>
        autoComplete="name"
        label={t('observations.submit.labels.submitterName')}
        name="submitterName"
        placeholder={t('observations.submit.placeholders.submitterName')}
        required
        requiredMessage={t('observations.submit.nameRequired')}
      />
      <FormTextField<ObservationSubmitFormSchema>
        hint={t('observations.submit.optional')}
        label={t('observations.submit.labels.submitterEducation')}
        name="submitterEducation"
        placeholder={t('observations.submit.placeholders.submitterEducation')}
      />
      <FormTextField<ObservationSubmitFormSchema>
        hint={t('observations.submit.hints.submitterContact')}
        label={t('observations.submit.labels.submitterContact')}
        name="submitterContact"
        placeholder={t('observations.submit.placeholders.submitterContact')}
      />
      <div className="flex flex-col gap-1">
        <FormCheckbox<ObservationSubmitFormSchema>
          label={t('observations.submit.aboutYou.remember')}
          labelAside={
            <InfoTip ariaLabel={t('observations.submit.aboutYou.rememberInfo')}>
              {t('observations.submit.aboutYou.rememberHint')}
            </InfoTip>
          }
          name="rememberDetails"
        />
        {onForget && <ForgetDetailsNote onForget={onForget} />}
      </div>
    </>
  )
}

export default SubmitterFields
