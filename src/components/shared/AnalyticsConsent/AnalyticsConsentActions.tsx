import { Button } from '@components/ui'
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
        className="flex-1 justify-center"
        onClick={() => onConsentChoose(false)}
        variant="outline"
      >
        {t('common.analyticsConsent.decline')}
      </Button>
      <Button
        className="flex-1 justify-center"
        onClick={() => onConsentChoose(true)}
        variant="outline"
      >
        {t('common.analyticsConsent.allow')}
      </Button>
    </div>
  )
}

export default AnalyticsConsentActions
