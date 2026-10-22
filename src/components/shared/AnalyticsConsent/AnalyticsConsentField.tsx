import { Checkbox } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { renderPrivacyPolicyLink } from './PrivacyPolicyLink'

type AnalyticsConsentFieldProps = {
  isAllowed: boolean
  onChange: (isAllowed: boolean) => void
}

const AnalyticsConsentField = ({ isAllowed, onChange }: AnalyticsConsentFieldProps) => {
  const t = useTranslations()

  return (
    <Checkbox
      checked={isAllowed}
      description={t.rich('common.disclaimer.analyticsHint', { link: renderPrivacyPolicyLink })}
      label={t('common.disclaimer.analyticsCheckbox')}
      onCheckedChange={onChange}
    />
  )
}

export default AnalyticsConsentField
