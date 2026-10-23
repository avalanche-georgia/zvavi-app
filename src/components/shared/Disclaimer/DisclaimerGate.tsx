'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { AnalyticsConsentCard } from '@components/shared/AnalyticsConsent'
import { disclaimerAcceptedCookieName } from '@domain/constants'
import { usePathname } from 'src/i18n/navigation'

import DisclaimerModal from './DisclaimerModal'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

// Readable before accepting, so the disclaimer's privacy-policy link works
const ungatedPathnames = new Set<string>([routes.privacy, routes.terms])

// Safari caps cookies written from script at 7 days, so it's written again on every
// visit: like the old localStorage flag, it only lapses after a week away
const setDisclaimerAccepted = () => {
  document.cookie = `${disclaimerAcceptedCookieName}=true; path=/; max-age=31536000; SameSite=Lax`
}

const subscribeToNothing = () => () => {}

// false in the server HTML and while hydrating, true from the first client render after
const useIsHydrated = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  )

type DisclaimerGateProps = {
  children: React.ReactNode
  // Read from the cookie by the layout
  isAcceptedInitially: boolean
}

// The page is always server-rendered, so it paints before any JS runs. Until the
// disclaimer is accepted it can't be used: it's inert and blurred from the first paint,
// and the modal (drawn once JS runs) takes over the dimming from there
const DisclaimerGate = ({ children, isAcceptedInitially }: DisclaimerGateProps) => {
  const pathname = usePathname()
  const isHydrated = useIsHydrated()
  const [isAccepted, setIsAccepted] = useState(isAcceptedInitially)
  const isUngated = ungatedPathnames.has(pathname)
  const isBlocked = !isAccepted && !isUngated
  // Never mounted for visitors who accepted before
  const hasDisclaimer = !isAcceptedInitially && !isUngated

  useEffect(() => {
    if (isAcceptedInitially) setDisclaimerAccepted()
  }, [isAcceptedInitially])

  const handleAccept = () => {
    setDisclaimerAccepted()
    setIsAccepted(true)
  }

  return (
    <>
      {/* Always rendered, so accepting never remounts the page */}
      <div className="contents" inert={isBlocked}>
        {children}
      </div>
      {/* Blurs the page for as long as the disclaimer is up. Its tint fades out as the
          modal's own backdrop fades in, so the dimming never doubles. Both stay mounted
          after accepting, so they fade out together */}
      {hasDisclaimer && (
        <>
          <div
            aria-hidden
            className={cn(
              'pointer-events-none fixed inset-0 z-50 backdrop-blur-xs transition-[opacity,background-color] duration-200 starting:opacity-0',
              isHydrated ? 'bg-transparent' : 'bg-scrim',
              !isBlocked && 'opacity-0',
            )}
          />
          <DisclaimerModal isOpen={isBlocked} onAccept={handleAccept} />
        </>
      )}
      {isAccepted && !isUngated && <AnalyticsConsentCard />}
    </>
  )
}

export default DisclaimerGate
