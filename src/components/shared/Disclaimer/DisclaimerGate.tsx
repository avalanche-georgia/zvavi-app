'use client'

import { useEffect, useState } from 'react'
import { AnalyticsConsentCard } from '@components/shared/AnalyticsConsent'
import { usePathname } from 'src/i18n/navigation'

import DisclaimerModal from './DisclaimerModal'

import { routes } from '@/routes'

const localStorageKey = 'main-disclaimer-accepted'

// Readable before accepting, so the disclaimer's privacy-policy link works
const ungatedPathnames = new Set<string>([routes.privacy, routes.terms])

const getDisclaimerAccepted = (): boolean => {
  if (typeof window === 'undefined') return false

  return localStorage.getItem(localStorageKey) === 'true'
}

const setDisclaimerAccepted = () => {
  localStorage.setItem(localStorageKey, 'true')
}

const DisclaimerGate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAccepted(getDisclaimerAccepted())
  }, [])

  const handleAccept = () => {
    setDisclaimerAccepted()
    setAccepted(true)
  }

  if (ungatedPathnames.has(pathname)) return children

  if (accepted === null) return null

  if (!accepted) {
    return <DisclaimerModal onAccept={handleAccept} />
  }

  return (
    <>
      {children}
      <AnalyticsConsentCard />
    </>
  )
}

export default DisclaimerGate
