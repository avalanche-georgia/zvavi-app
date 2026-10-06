'use client'

import { useContext } from 'react'
import type { Partner } from '@domain/types'

import PartnerTrackingContext from './PartnerTrackingContext'
import hasPartnerDetails from '../PartnersList/hasPartnerDetails'

import { trackPartnerBadgeClick, trackPartnerWebsiteClick } from '@/lib/posthog/events'

const usePartnerTracking = (partner: Partner) => {
  const placement = useContext(PartnerTrackingContext)
  const hasDetails = hasPartnerDetails(partner)

  const trackBadgeClick = () => {
    if (!placement) return

    trackPartnerBadgeClick({ hasDetails, partner, placement })

    // Without details the badge itself is the website link
    if (!hasDetails) {
      trackPartnerWebsiteClick({ isFromDrawer: false, partner, placement })
    }
  }

  const trackDrawerWebsiteClick = () => {
    if (!placement) return

    trackPartnerWebsiteClick({ isFromDrawer: true, partner, placement })
  }

  return { hasDetails, trackBadgeClick, trackDrawerWebsiteClick }
}

export default usePartnerTracking
