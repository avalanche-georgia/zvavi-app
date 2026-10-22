'use client'

import { useAnalyticsConsent, useBoolean } from '@components/hooks'
import { Dialog } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import AnalyticsConsentActions from './AnalyticsConsentActions'
import PrivacyPolicyLink from './PrivacyPolicyLink'

// Footer entry point for changing the analytics choice later
const AnalyticsPreferencesButton = ({ className }: { className?: string }) => {
  const t = useTranslations()
  const { setConsent, status } = useAnalyticsConsent()
  const [isOpen, { setFalse: closeModal, setTrue: openModal }] = useBoolean()

  if (!status) return null

  const handleOpenChange = (isNextOpen: boolean) => {
    if (!isNextOpen) closeModal()
  }

  const handleChoose = (isGranted: boolean) => {
    setConsent(isGranted)
    closeModal()
  }

  return (
    <>
      <button className={className} onClick={openModal} type="button">
        {t('common.analyticsConsent.preferences')}
      </button>

      <Dialog
        closeLabel={t('common.actions.close')}
        footer={<AnalyticsConsentActions className="flex-1" onConsentChoose={handleChoose} />}
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title={t('common.analyticsConsent.title')}
      >
        <p>{t('common.analyticsConsent.description')}</p>
        <p className="font-semibold">{t(`common.analyticsConsent.status.${status}`)}</p>
        <PrivacyPolicyLink>{t('common.analyticsConsent.privacyLink')}</PrivacyPolicyLink>
      </Dialog>
    </>
  )
}

export default AnalyticsPreferencesButton
