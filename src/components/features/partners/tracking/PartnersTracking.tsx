'use client'

import { useEffect, useRef } from 'react'
import { useAnalyticsConsent } from '@components/hooks'
import type { Partner } from '@domain/types'
import { useParams } from 'next/navigation'
import { usePathname } from 'src/i18n/navigation'

import PartnerTrackingContext from './PartnerTrackingContext'

import { type PartnerPlacement, trackPartnersShown } from '@/lib/posthog/events'

type PartnersTrackingProps = {
  children: React.ReactNode
  partners: Partner[]
  placement: PartnerPlacement
}

// Fires partners_shown once per page view and gives badges their placement for click events
const PartnersTracking = ({ children, partners, placement }: PartnersTrackingProps) => {
  const pathname = usePathname()
  const params = useParams()
  const { status } = useAnalyticsConsent()
  const trackedPathnameRef = useRef<string | null>(null)

  const regionId = typeof params?.region === 'string' ? params.region : null
  const partnerIdsKey = partners.map((partner) => partner.id).join(',')

  useEffect(() => {
    // Wait for an answer: events are dropped while consent is pending
    if (!status || status === 'pending') return
    if (!partnerIdsKey || trackedPathnameRef.current === pathname) return

    trackedPathnameRef.current = pathname
    trackPartnersShown({ partnerIds: partnerIdsKey.split(','), placement, regionId })
  }, [partnerIdsKey, pathname, placement, regionId, status])

  return (
    <PartnerTrackingContext.Provider value={placement}>{children}</PartnerTrackingContext.Provider>
  )
}

export default PartnersTracking
