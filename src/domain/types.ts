import type {
  aspects,
  avalancheTriggers,
  avalancheTypes,
  confidenceLevels,
  distributionTypes,
  memberGenders,
  sensitivityLevels,
  staffRoles,
  trends,
} from '@domain/constants'
import type { FeatureCollection } from 'geojson'

import type { Enums, Tables } from '@/lib/supabase/types'

export type RegionId = Enums<'region_id'>

export type Region = Omit<Tables<'regions'>, 'mapCenter' | 'forecastZone'> & {
  mapCenter: { lat: number; lng: number } | null
  forecastZone: FeatureCollection | null
}

export type HazardLevel = 'noRating' | 'low' | 'moderate' | 'considerable' | 'high' | 'extreme'

export type HazardLevelScale = '0' | '1' | '2' | '3' | '4' | '5'
export type ElevationZone = 'highAlpine' | 'alpine' | 'subAlpine'
export type TimeRange = { start: Date | string | null; end: Date | string | null }

export type User = {
  id: string
  email: string
}

export type UserRole = 'forecaster' | 'trainee' | 'admin'
export type StaffRole = (typeof staffRoles)[number]

export type UserProfile = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  fullName: string
  about: string | null
  avatarUrl: string | null
  role: UserRole
  // Public Team page: the section (admin-set) and the person's consent
  team: TeamSection | null
  isPublic: boolean
  // Their own badge text (≤ 24 characters; the section name when empty)
  teamTitle: string | null
  // https URLs, at most five
  socialLinks: string[]
  createdAt: string
}

export type TeamSection = Enums<'team_section'>

// A staff profile on the admin Team page: what is shown publicly, and whether it is
export type TeamProfile = Pick<
  UserProfile,
  'avatarUrl' | 'firstName' | 'fullName' | 'id' | 'isPublic' | 'lastName' | 'role' | 'team'
>

// One person's place on the admin Team board: section (null = none) and position
export type TeamOrderUpdate = { id: string; team: TeamSection | null; teamOrder: number | null }

// A profile as the public Team page shows it — never email or role
export type TeamMember = Pick<
  UserProfile,
  'about' | 'avatarUrl' | 'firstName' | 'fullName' | 'id' | 'lastName' | 'socialLinks' | 'teamTitle'
> & { team: TeamSection }

export type AvalancheSize = 1 | 2 | 3 | 4 | 5
export type AvalancheType = keyof typeof avalancheTypes
export type AvalancheTrigger = keyof typeof avalancheTriggers
export type AvalancheProblemType = AvalancheType
export type AvalancheSource = Enums<'avalanche_source'>
export type AvalancheStatus = Enums<'avalanche_status'>
export type Confidence = keyof typeof confidenceLevels
export type Distribution = keyof typeof distributionTypes
export type Sensitivity = keyof typeof sensitivityLevels
export type Trend = keyof typeof trends
export type Aspect = keyof typeof aspects
export type ElevationKey = ElevationZone | 'overall'
export type HazardLevels = Record<ElevationKey, HazardLevelScale>
export type Aspects = Record<ElevationZone, Aspect[]>

export type Forecast = {
  additionalHazards: string
  createdAt: string
  forecaster: string
  // The forecaster's profile; null for a guest name or a legacy row
  forecasterId: string | null
  hazardLevels: HazardLevels
  id: number
  publishedAt: string | null
  regionId: RegionId
  snowpack: string
  status: 'draft' | 'published'
  summary: string
  validUntil: string
  weather: string
}

// One row of the admin forecasts list — DB nullability kept (old rows may lack fields)
export type ForecastListItem = Pick<
  Tables<'forecasts'>,
  'createdAt' | 'forecaster' | 'id' | 'publishedAt' | 'status' | 'summary' | 'validUntil'
> & { hazardLevels: HazardLevels }

export type Problem = {
  id?: string | number
  aspects: Aspects
  avalancheSize: AvalancheSize
  confidence: Confidence
  createdAt?: string
  description: string
  distribution: Distribution
  isAllDay: boolean
  order: number
  sensitivity: Sensitivity
  timeOfDay: TimeRange
  trend: Trend
  type: AvalancheProblemType
}

export type Avalanche = {
  id?: number
  aspects: Aspects
  createdAt?: string
  createdByUserId?: string | null
  date: Date | string | null
  description: string
  involvement: string | null
  isDateUnknown: boolean
  latitude: number | null
  location: string | null
  longitude: number | null
  photoKeys?: string[] | null
  quantity: number
  regionId: RegionId
  size: AvalancheSize
  slabDepth: number | null
  source?: AvalancheSource
  status?: AvalancheStatus
  submitterContact?: string | null
  submitterEducation?: string | null
  submitterName?: string | null
  trigger: AvalancheTrigger
  type: AvalancheType | 'unknown'
  width: number | null
}

export type AvalancheFormData = {
  id?: number
  aspects: Aspects
  date: Date | null
  description: string
  involvement: string | null
  isDateUnknown: boolean
  latitude: number | null
  location: string | null
  longitude: number | null
  photoKeys?: string[] | null
  quantity: number
  regionId?: RegionId
  size: AvalancheSize
  slabDepth: number | null
  source?: AvalancheSource
  status?: AvalancheStatus
  submitterContact?: string | null
  submitterEducation?: string | null
  submitterName?: string | null
  trigger: AvalancheTrigger | null
  type: AvalancheType | 'unknown' | null
  width: number | null
}

// Signed, short-lived URLs for one photo's resized variants
export type PhotoUrls = {
  // Stable per photo — for React keys
  id: string
  largeUrl: string
  previewUrl: string
  thumbUrl: string
}

// What the public observations endpoint exposes — never contact, education or
// any other submitter data beyond the shortened name.
export type PublicObservation = Pick<
  Avalanche,
  | 'aspects'
  | 'date'
  | 'description'
  | 'isDateUnknown'
  | 'latitude'
  | 'location'
  | 'longitude'
  | 'quantity'
  | 'regionId'
  | 'size'
  | 'slabDepth'
  | 'source'
  | 'trigger'
  | 'type'
  | 'width'
> & {
  createdAt: string
  id: number
  photos: PhotoUrls[]
  // Team records only: the photo of the staff member who logged them
  submitterAvatarUrl: string | null
  // Shortened; on a team record, the staff member who logged it ('' when unknown)
  submitterName: string
}

export type ObservationDateBasis = 'occurred' | 'reported'
export type ObservationsSort = 'newest' | 'largest'

// One page of the public list, plus the total matching the filter
export type ObservationsPage = {
  observations: PublicObservation[]
  total: number
}

// Just enough to draw a map marker
export type ObservationPoint = Pick<PublicObservation, 'id' | 'size' | 'type'> & {
  latitude: number
  longitude: number
}

export type ObservationPoints = {
  points: ObservationPoint[]
  // All published observations in the region, ignoring the filter
  regionTotal: number
}

// A linked record as the public sees it: no internal or submitter fields
export type PublicAvalanche = Omit<
  Avalanche,
  | 'createdByUserId'
  | 'involvement'
  | 'photoKeys'
  | 'source'
  | 'status'
  | 'submitterContact'
  | 'submitterEducation'
  | 'submitterName'
> & {
  createdAt: string
  id: number
  // Signed, short-lived URLs of the record's photos
  photos: PhotoUrls[]
}

// Public forecast: only published linked records, public fields only
export type FullForecast = Forecast & {
  avalancheProblems: Problem[]
  recentAvalanches: PublicAvalanche[]
}

// Admin forecast (edit form): problems + the IDs of the linked records
export type AdminForecast = Forecast & {
  avalancheProblems: Problem[]
  recentAvalancheIds: number[]
}

export type MemberStatus = Enums<'member_status'>

export type MemberGender = (typeof memberGenders)[number]

export type Member = Omit<Tables<'members'>, 'gender'> & { gender: MemberGender | null }

export type MemberFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number | null
  gender: MemberGender | ''
  address: string
  occupation: string
  motivation: string
  memberId: string
  status: MemberStatus
  joinedAt: Date | null
  expiresAt: Date | null
  notes: string
}

export type PartnerTier = 1 | 2 | 3

export type Partner = Omit<Tables<'partners'>, 'tier'> & { tier: PartnerTier }

export type PartnerFormData = {
  nameEn: string
  nameKa: string
  descriptionEn: string
  descriptionKa: string
  benefitEn: string
  benefitKa: string
  logoUrl: string
  websiteUrl: string
  tier: PartnerTier | null
  isActive: boolean
}

export type WeatherStation = Tables<'weather_stations'>

export type WeatherStationFormData = {
  altitude: number
  nameEn: string
  nameKa: string
  url: string
}

export type MemberVerification = {
  id: string
  memberId: string
  verifiedAt: string
  ipAddress: string | null
  userAgent: string | null
}

export type VerifyMemberResponse = {
  success: boolean
  error?: string
  member?: {
    firstName: string
    lastName: string
    memberId: string
    status: MemberStatus
    joinedAt: string
    expiresAt: string | null
  }
}
