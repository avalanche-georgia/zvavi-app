'use client'

import { useEffect, useState } from 'react'

import DisclaimerModal from './DisclaimerModal'

const localStorageKey = 'main-disclaimer-accepted'

const getDisclaimerAccepted = (): boolean => {
  if (typeof window === 'undefined') return false

  return localStorage.getItem(localStorageKey) === 'true'
}

const setDisclaimerAccepted = () => {
  localStorage.setItem(localStorageKey, 'true')
}

const DisclaimerGate = ({ children }: { children: React.ReactNode }) => {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    setAccepted(getDisclaimerAccepted())
  }, [])

  const handleAccept = () => {
    setDisclaimerAccepted()
    setAccepted(true)
  }

  if (accepted === null) return null

  if (!accepted) {
    return <DisclaimerModal onAccept={handleAccept} />
  }

  return children
}

export default DisclaimerGate
