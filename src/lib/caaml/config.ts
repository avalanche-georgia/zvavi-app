import { baseUrl } from '../../app/routes'

export type TextFormat = 'html' | 'plain'

// Public API settings. Items marked TBD are pending answers from the lead
// forecaster / chairman — changing them is a one-line edit here.
export const apiVersion = 1

export const providerName = 'Avalanche Georgia'

export const providerWebsite = baseUrl

// Never change: bulletinID values are derived from it and partners key on them.
export const bulletinIdNamespace = '6f0f3b7e-5d0a-4c0e-9a55-2f1d7a8c4b31'

// Key of our block inside every CAAML `customData` object.
export const customDataNamespace = 'avalancheGeorgia'

// Problem time windows are evaluated in local time (Georgia has no DST).
export const localTimeZone = 'Asia/Tbilisi'

// TBD (T2): rating for a band with level '0' — 'no_rating' or 'no_snow'.
export const noSnowRating: 'no_rating' | 'no_snow' = 'no_rating'

// TBD (T7): format of the `comment` texts.
export const textFormat: TextFormat = 'html'
