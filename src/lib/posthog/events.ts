import type { Partner } from '@domain/types'
import type { CaptureOptions, Properties } from 'posthog-js'
import posthog from 'posthog-js'

import { isAnalyticsEnabled } from './consent'

export type PartnerPlacement = 'forecast' | 'home' | 'partners_page'

type PartnerEventContext = {
  partner: Partner
  placement: PartnerPlacement
}

const capture = (eventName: string, properties: Properties, options?: CaptureOptions) => {
  if (!isAnalyticsEnabled()) return

  try {
    posthog.capture(eventName, properties, options)
  } catch {
    // Analytics must never break the page
  }
}

const getPartnerProperties = ({ partner, placement }: PartnerEventContext) => ({
  partner_id: partner.id,
  partner_name: partner.nameEn,
  partner_tier: partner.tier,
  placement,
})

export const trackPartnersShown = ({
  partnerIds,
  placement,
  regionId,
}: {
  partnerIds: string[]
  placement: PartnerPlacement
  regionId: string | null
}) => {
  capture('partners_shown', { partner_ids: partnerIds, placement, region: regionId })
}

export const trackPartnerBadgeClick = ({
  hasDetails,
  ...context
}: PartnerEventContext & { hasDetails: boolean }) => {
  capture('partner_badge_clicked', {
    ...getPartnerProperties(context),
    has_description: hasDetails,
  })
}

export const trackPartnerWebsiteClick = ({
  isFromDrawer,
  ...context
}: PartnerEventContext & { isFromDrawer: boolean }) => {
  // sendBeacon survives the page being left right after the click
  capture(
    'partner_website_clicked',
    { ...getPartnerProperties(context), from_drawer: isFromDrawer },
    { transport: 'sendBeacon' },
  )
}
