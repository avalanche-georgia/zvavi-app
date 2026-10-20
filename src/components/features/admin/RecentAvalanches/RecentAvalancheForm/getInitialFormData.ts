import { fromObservationDate, type PhotoUpload } from '@components/features/observations/form'
import type { Avalanche } from '@domain/types'

import type { AvalancheFormSchema } from './schema'

import { getTbilisiToday } from '@/lib/tbilisiTime'

const emptyAspects = { alpine: [], highAlpine: [], subAlpine: [] }

// A saved photo: no file, already "uploaded" under its permanent key. Its
// preview URL is looked up separately (signed URLs load after the form opens).
const toStoredPhoto = (key: string): PhotoUpload => ({
  file: null,
  id: key,
  key,
  previewUrl: '',
  progress: 1,
  status: 'uploaded',
})

// A saved record's calendar day and HH:mm, in Georgian time
const getStoredDate = (avalanche: Avalanche | undefined) =>
  avalanche?.date ? fromObservationDate(new Date(avalanche.date)) : null

// A new record starts like the public form: dated today, nothing else picked
const getInitialFormData = (avalanche: Avalanche | undefined): AvalancheFormSchema => ({
  aspects: avalanche?.aspects ?? emptyAspects,
  date: avalanche ? (getStoredDate(avalanche)?.day ?? null) : getTbilisiToday(),
  description: avalanche?.description || null,
  involvement: avalanche?.involvement ?? null,
  isDateUnknown: avalanche?.isDateUnknown ?? false,
  latitude: avalanche?.latitude ?? null,
  location: avalanche?.location ?? null,
  longitude: avalanche?.longitude ?? null,
  photos: (avalanche?.photoKeys ?? []).map(toStoredPhoto),
  quantity: avalanche?.quantity ?? 1,
  size: avalanche?.size ?? null,
  slabDepth: avalanche?.slabDepth ?? null,
  status: avalanche?.status ?? 'published',
  time: avalanche?.isTimeKnown ? (getStoredDate(avalanche)?.time ?? null) : null,
  trigger: avalanche?.trigger ?? '',
  type: avalanche?.type ?? '',
  width: avalanche?.width ?? null,
})

export default getInitialFormData
