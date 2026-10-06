import { Checkbox } from '@components/ui'
import { useTranslations } from 'next-intl'

import { renderPrivacyPolicyLink } from './PrivacyPolicyLink'

type AnalyticsConsentFieldProps = {
  isAllowed: boolean
  onChange: (isAllowed: boolean) => void
}

const AnalyticsConsentField = ({ isAllowed, onChange }: AnalyticsConsentFieldProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-1">
      <Checkbox
        isChecked={isAllowed}
        label={t('common.disclaimer.analyticsCheckbox')}
        onChange={onChange}
      />
      <p className="pl-7 text-xs text-gray-500">
        {t.rich('common.disclaimer.analyticsHint', { link: renderPrivacyPolicyLink })}
      </p>
    </div>
  )
}

export default AnalyticsConsentField
