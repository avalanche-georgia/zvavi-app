import type { AvalancheFormData } from '@domain/types'

export type FormErrors = {
  date?: string
  latitude?: string
  longitude?: string
  trigger?: string
  type?: string
}

export const validate = (data: AvalancheFormData, isLocationRequired: boolean): FormErrors => {
  const errors: FormErrors = {}

  if (!data.isDateUnknown && !data.date) errors.date = 'required'
  if (!data.type) errors.type = 'required'
  if (!data.trigger) errors.trigger = 'required'
  if (isLocationRequired && data.latitude === null) errors.latitude = 'required'
  if (isLocationRequired && data.longitude === null) errors.longitude = 'required'

  return errors
}

// Coordinates are required for new avalanches; legacy ones saved without them
// stay editable (mirrors the recent_avalanches DB trigger).
export const getIsLocationRequired = ({ id, latitude, longitude }: AvalancheFormData) =>
  id == null || (latitude !== null && longitude !== null)
