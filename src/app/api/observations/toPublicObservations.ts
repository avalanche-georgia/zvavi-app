import { convertSnakeToCamel } from '@data/helpers'
import type { PublicObservation } from '@domain/types'

import fetchStaffProfiles from './fetchStaffProfiles'
import shortenName from './shortenName'

import { signPhotoUrls } from '@/lib/r2'

type PublicObservationRow = Omit<
  PublicObservation,
  'aspects' | 'description' | 'photos' | 'submitterAvatarUrl'
> & {
  aspects: PublicObservation['aspects'] | null
  createdByUserId: string | null
  description: string | null
  photoKeys: string[] | null
  submitterName: string | null
}

const emptyAspects: PublicObservation['aspects'] = { alpine: [], highAlpine: [], subAlpine: [] }

// The staff member to name on a team record that has no submitter name
const getCreatorId = ({
  createdByUserId,
  source,
  submitterName,
}: Pick<PublicObservationRow, 'createdByUserId' | 'source' | 'submitterName'>) =>
  source === 'team' && !submitterName?.trim() ? createdByUserId : null

// DB rows → public shape: signed photo URLs (one signing pass for all rows),
// shortened reporter name — the submitter's, or on a team record the staff
// member's who logged it, with their photo — and null-safe aspects/description. The creator's
// user id stays on the server.
const toPublicObservations = async (data: unknown[]): Promise<PublicObservation[]> => {
  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const rows = convertSnakeToCamel(data) as PublicObservationRow[]
  const creatorIds = new Set(rows.map(getCreatorId).filter((id) => id !== null))

  const [photoUrls, staffProfiles] = await Promise.all([
    signPhotoUrls(rows.flatMap((row) => row.photoKeys ?? [])),
    fetchStaffProfiles([...creatorIds]),
  ])

  return rows.map(({ aspects, createdByUserId, description, photoKeys, submitterName, ...row }) => {
    const creatorId = getCreatorId({ createdByUserId, source: row.source, submitterName })
    const creator = creatorId ? staffProfiles.get(creatorId) : undefined

    return {
      ...row,
      aspects: aspects ?? emptyAspects,
      description: description ?? '',
      photos: (photoKeys ?? []).map((key) => photoUrls.get(key)!),
      submitterAvatarUrl: creator?.avatarUrl ?? null,
      submitterName: shortenName(creatorId ? (creator?.name ?? null) : submitterName),
    }
  })
}

export default toPublicObservations
