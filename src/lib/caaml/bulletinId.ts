import { v5 as uuidV5 } from 'uuid'

import { bulletinIdNamespace } from './config'

// Stable forever for a given forecast: partners key on it
const bulletinId = (forecastId: number) => uuidV5(`forecast:${forecastId}`, bulletinIdNamespace)

export default bulletinId
