import { InfoTip } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Forecast text is rendered as markdown on the public page — shows the syntax
const FormattingInfo = () => {
  const t = useTranslations()

  return (
    <InfoTip ariaLabel={t('admin.forecast.form.general.formattingInfo')}>
      {t('admin.forecast.form.general.formattingHint')}
    </InfoTip>
  )
}

export default FormattingInfo
