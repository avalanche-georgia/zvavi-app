'use client'

import { useAnalyticsConsent } from '@components/hooks'
import { IconButton } from '@ds/primitives'
import { ChartColumn, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import AnalyticsConsentActions from './AnalyticsConsentActions'
import PrivacyPolicyLink from './PrivacyPolicyLink'

// Non-blocking ask for visitors past the disclaimer: shown until they answer, and again each time
// a "No thanks" expires
const AnalyticsConsentCard = () => {
  const t = useTranslations()
  const { setConsent, shouldAsk } = useAnalyticsConsent()

  if (!shouldAsk) return null

  // Closing without answering counts as "No thanks"
  const handleDismiss = () => setConsent(false)

  return (
    // Above the header, sticky bars, floating buttons and sheets/dialogs (z-50); below tooltips and
    // menus (z-60), so the close button's tooltip stays visible
    <aside
      aria-label={t('common.analyticsConsent.title')}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-55 flex justify-center p-4"
    >
      <div className="rounded-card bg-surface shadow-panel border-accent pointer-events-auto flex w-full max-w-(--breakpoint-sm) flex-col gap-4 border-t-4 p-5">
        <header className="flex items-center gap-3">
          <span className="bg-accent-soft text-accent grid size-10 shrink-0 place-items-center rounded-full">
            <ChartColumn aria-hidden className="size-5" />
          </span>
          <h2 className="text-heading text-ink flex-1 font-semibold">
            {t('common.analyticsConsent.title')}
          </h2>
          <IconButton
            aria-label={t('common.analyticsConsent.closeAndDecline')}
            onClick={handleDismiss}
          >
            <X aria-hidden className="size-4.5" />
          </IconButton>
        </header>

        <p className="text-copy text-body">
          {t('common.analyticsConsent.description')}{' '}
          <PrivacyPolicyLink>{t('common.analyticsConsent.privacyLink')}</PrivacyPolicyLink>
        </p>

        <AnalyticsConsentActions onConsentChoose={setConsent} />
      </div>
    </aside>
  )
}

export default AnalyticsConsentCard
