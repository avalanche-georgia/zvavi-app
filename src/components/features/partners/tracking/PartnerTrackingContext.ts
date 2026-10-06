'use client'

import { createContext } from 'react'

import type { PartnerPlacement } from '@/lib/posthog/events'

// null = partners rendered outside a tracked placement; clicks are not tracked then
const PartnerTrackingContext = createContext<PartnerPlacement | null>(null)

export default PartnerTrackingContext
