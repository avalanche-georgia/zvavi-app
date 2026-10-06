import { useState } from 'react'
import { useAnalyticsConsent } from '@components/hooks'
import { LanguageToggle } from '@components/shared'
import { AnalyticsConsentField } from '@components/shared/AnalyticsConsent'
import { Button, Checkbox } from '@components/ui'
import { Modal, ModalBody, ModalFooter } from '@components/ui/Modal'
import { useTranslations } from 'next-intl'

const DisclaimerModal = ({ onAccept }: { onAccept: VoidFunction }) => {
  const t = useTranslations()
  const { setConsent, status: analyticsStatus } = useAnalyticsConsent()
  const [isAccepted, setIsAccepted] = useState(false)
  // Optional and independent of the safety acknowledgement; never pre-ticked for a new choice
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(analyticsStatus === 'granted')

  const handleClose = () => {
    if (!isAccepted) return

    if (analyticsStatus) {
      setConsent(isAnalyticsAllowed)
    }

    onAccept()
  }

  return (
    <Modal
      hideCloseButton
      isOpen
      onClose={handleClose}
      title={t('common.disclaimer.title')}
      titleClassName="text-center"
    >
      <ModalBody>
        <div className="mb-4 flex flex-col gap-6">
          <p>{t('common.disclaimer.content')}</p>
          <Checkbox
            isChecked={isAccepted}
            label={t('common.disclaimer.checkbox')}
            onChange={setIsAccepted}
          />
          {analyticsStatus && (
            <AnalyticsConsentField
              isAllowed={isAnalyticsAllowed}
              onChange={setIsAnalyticsAllowed}
            />
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <div>
          <LanguageToggle />
        </div>

        <Button className="ml-auto" disabled={!isAccepted} onClick={handleClose}>
          {t('common.actions.continue')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DisclaimerModal
