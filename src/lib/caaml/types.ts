import type { AvalancheType, Confidence, ElevationZone, Trend } from '@domain/types'

// The subset of the CAAML v6 EAWS bulletin schema we emit
// (schema/CAAMLv6_BulletinEAWS.json is the source of truth).

export type CaamlDangerRatingValue =
  | 'low'
  | 'moderate'
  | 'considerable'
  | 'high'
  | 'very_high'
  | 'no_snow'
  | 'no_rating'

export type CaamlProblemType =
  | 'new_snow'
  | 'wind_slab'
  | 'persistent_weak_layers'
  | 'wet_snow'
  | 'gliding_snow'
  | 'cornices'

export type CaamlSnowpackStability = 'good' | 'fair' | 'poor' | 'very_poor'
export type CaamlFrequency = 'few' | 'some' | 'many'
export type CaamlValidTimePeriod = 'all_day' | 'earlier' | 'later'
export type CaamlAspect = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'
export type CaamlElevation = { lowerBound?: string; upperBound?: string }
export type CaamlText = { comment: string }

export type CaamlExtFile = {
  description: string
  fileReferenceURI: string
  fileType: string
}

export type CaamlDangerRating = {
  elevation: CaamlElevation
  mainValue: CaamlDangerRatingValue
  validTimePeriod: CaamlValidTimePeriod
}

export type CaamlProblemCustomData = {
  avalancheGeorgia: {
    bands: ElevationZone[]
    confidence?: Confidence
    priority: number
    problemType: AvalancheType
    trend?: Trend
  }
}

export type CaamlAvalancheProblem = {
  aspects?: CaamlAspect[]
  avalancheSize: number
  comment?: string
  customData: CaamlProblemCustomData
  elevation?: CaamlElevation
  frequency?: CaamlFrequency
  problemType: CaamlProblemType
  snowpackStability?: CaamlSnowpackStability
  validTimePeriod: CaamlValidTimePeriod
}

export type CaamlBulletin = {
  avalancheActivity?: CaamlText
  avalancheProblems: CaamlAvalancheProblem[]
  bulletinID: string
  customData: {
    avalancheGeorgia: { expired: boolean; forecastId: number; overallDangerLevel?: string }
  }
  dangerRatings: CaamlDangerRating[]
  lang: 'en'
  metaData: { extFiles: CaamlExtFile[] }
  publicationTime: string
  regions: { name: string; regionID: string }[]
  snowpackStructure?: CaamlText
  source: { provider: { name: string; website: string } }
  travelAdvisory?: CaamlText
  validTime: { endTime: string; startTime: string }
  weatherForecast?: CaamlText
}

export type CaamlBulletinCollection = {
  bulletins: CaamlBulletin[]
  customData: { avalancheGeorgia: { apiVersion: number } }
  metaData: { extFiles: CaamlExtFile[] }
}
