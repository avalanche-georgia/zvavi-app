'use client'

import { useAnalyticsConsent } from '@components/hooks'
import { IconButton } from '@components/ui'
import { useTranslations } from 'next-intl'

import AnalyticsConsentActions from './AnalyticsConsentActions'
import PrivacyPolicyLink from './PrivacyPolicyLink'

// One-time, non-blocking ask for visitors who accepted the disclaimer before analytics existed
const AnalyticsConsentCard = () => {
  const t = useTranslations()
  const { setConsent, status } = useAnalyticsConsent()

  if (status !== 'pending') return null

  // Closing without answering counts as "No thanks", so the card never comes back
  const handleDismiss = () => setConsent(false)

  return (
    <aside
      aria-label={t('common.analyticsConsent.title')}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-10 flex justify-center p-4"
    >
      <div className="pointer-events-auto flex w-full max-w-(--breakpoint-sm) flex-col gap-3 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/10">
        <header className="flex items-center gap-2">
          <h2 className="flex-1 text-sm font-semibold">{t('common.analyticsConsent.title')}</h2>
          <IconButton
            aria-label={t('common.analyticsConsent.close')}
            iconProps={{ icon: 'xMark' }}
            onClick={handleDismiss}
            size="sm"
          />
        </header>

        <p className="text-xs text-gray-600">
          {t('common.analyticsConsent.description')}{' '}
          <PrivacyPolicyLink>{t('common.analyticsConsent.privacyLink')}</PrivacyPolicyLink>
        </p>

        <AnalyticsConsentActions onChoose={setConsent} />
      </div>
    </aside>
  )
}

export default AnalyticsConsentCard
