import { convertSnakeToCamel } from '@data/helpers'
import type { PublicObservation } from '@domain/types'

import shortenName from './shortenName'

import { signPhotoUrls } from '@/lib/r2'

type PublicObservationRow = Omit<PublicObservation, 'aspects' | 'description' | 'photos'> & {
  aspects: PublicObservation['aspects'] | null
  description: string | null
  photoKeys: string[] | null
  submitterName: string | null
}

const emptyAspects: PublicObservation['aspects'] = { alpine: [], highAlpine: [], subAlpine: [] }

// DB rows → public shape: signed photo URLs (one signing pass for all rows),
// shortened submitter name, null-safe aspects/description
const toPublicObservations = async (data: unknown[]): Promise<PublicObservation[]> => {
  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const rows = convertSnakeToCamel(data) as PublicObservationRow[]
  const photoUrls = await signPhotoUrls(rows.flatMap((row) => row.photoKeys ?? []))

  return rows.map(({ aspects, description, photoKeys, submitterName, ...row }) => ({
    ...row,
    aspects: aspects ?? emptyAspects,
    description: description ?? '',
    photos: (photoKeys ?? []).map((key) => photoUrls.get(key)!),
    submitterName: shortenName(submitterName),
  }))
}

export default toPublicObservations
