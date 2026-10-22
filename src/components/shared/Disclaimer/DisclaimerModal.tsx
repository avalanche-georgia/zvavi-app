import { useState } from 'react'
import { useAnalyticsConsent } from '@components/hooks'
import { LanguageToggle } from '@components/shared'
import { AnalyticsConsentField } from '@components/shared/AnalyticsConsent'
import { Button, Checkbox, Dialog } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// A required acknowledgement: only Continue, once ticked, closes it
const DisclaimerModal = ({ onAccept }: { onAccept: VoidFunction }) => {
  const t = useTranslations()
  const { setConsent, status: analyticsStatus } = useAnalyticsConsent()
  const [isAccepted, setIsAccepted] = useState(false)
  // Optional and independent of the safety acknowledgement; never pre-ticked for a new choice
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(analyticsStatus === 'granted')

  const handleContinue = () => {
    if (analyticsStatus) {
      setConsent(isAnalyticsAllowed)
    }

    onAccept()
  }

  const footer = (
    // One row on every screen: the language stays next to Continue
    <div className="flex flex-1 items-center justify-between gap-3">
      <LanguageToggle />
      <Button disabled={!isAccepted} onClick={handleContinue}>
        {t('common.actions.continue')}
      </Button>
    </div>
  )

  return (
    <Dialog footer={footer} isCloseDisabled isOpen isWide title={t('common.disclaimer.title')}>
      <p>{t('common.disclaimer.content')}</p>
      <Checkbox
        checked={isAccepted}
        className="self-end"
        label={t('common.disclaimer.checkbox')}
        onCheckedChange={setIsAccepted}
      />
      {analyticsStatus && (
        <AnalyticsConsentField isAllowed={isAnalyticsAllowed} onChange={setIsAnalyticsAllowed} />
      )}
    </Dialog>
  )
}

export default DisclaimerModal
