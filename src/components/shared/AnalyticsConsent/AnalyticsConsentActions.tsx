import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type AnalyticsConsentActionsProps = {
  className?: string
  onConsentChoose: (isGranted: boolean) => void
}

// Both answers are equally prominent on purpose
const AnalyticsConsentActions = ({ className, onConsentChoose }: AnalyticsConsentActionsProps) => {
  const t = useTranslations()

  return (
    <div className={cn('flex gap-2', className)}>
      <Button
        className="flex-1"
        onClick={() => onConsentChoose(false)}
        size="sm"
        variant="secondary"
      >
        {t('common.analyticsConsent.decline')}
      </Button>
      <Button
        className="flex-1"
        onClick={() => onConsentChoose(true)}
        size="sm"
        variant="secondary"
      >
        {t('common.analyticsConsent.allow')}
      </Button>
    </div>
  )
}

export default AnalyticsConsentActions
