'use client'

import { useAnalyticsConsent, useBoolean } from '@components/hooks'
import { Modal, ModalBody, ModalFooter } from '@components/ui/Modal'
import { useTranslations } from 'next-intl'

import AnalyticsConsentActions from './AnalyticsConsentActions'
import PrivacyPolicyLink from './PrivacyPolicyLink'

// Footer entry point for changing the analytics choice later
const AnalyticsPreferencesButton = ({ className }: { className?: string }) => {
  const t = useTranslations()
  const { setConsent, status } = useAnalyticsConsent()
  const [isOpen, { setFalse: closeModal, setTrue: openModal }] = useBoolean()

  if (!status) return null

  const handleChoose = (isGranted: boolean) => {
    setConsent(isGranted)
    closeModal()
  }

  return (
    <>
      <button className={className} onClick={openModal} type="button">
        {t('common.analyticsConsent.preferences')}
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title={t('common.analyticsConsent.title')}>
        <ModalBody>
          <div className="flex max-w-md flex-col gap-3 text-sm">
            <p>{t('common.analyticsConsent.description')}</p>
            <p className="font-medium">{t(`common.analyticsConsent.status.${status}`)}</p>
            <PrivacyPolicyLink>{t('common.analyticsConsent.privacyLink')}</PrivacyPolicyLink>
          </div>
        </ModalBody>

        <ModalFooter>
          <AnalyticsConsentActions className="w-full" onChoose={handleChoose} />
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AnalyticsPreferencesButton
