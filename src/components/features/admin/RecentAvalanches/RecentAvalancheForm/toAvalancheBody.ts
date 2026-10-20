import { toObservationDateIso } from '@components/features/observations/form'

import type { AvalancheFormData } from './schema'

// Validated form fields → the admin API's fields. Empty text is stored as null.
// Photos aren't included: create and update take them differently. The optional
// time goes into the date and the isTimeKnown flag.
const toAvalancheBody = ({ time, ...formData }: Omit<AvalancheFormData, 'photos'>) => ({
  ...formData,
  date: formData.date && !formData.isDateUnknown ? toObservationDateIso(formData.date, time) : null,
  description: formData.description?.trim() || null,
  involvement: formData.involvement?.trim() || null,
  isTimeKnown: !!time && !formData.isDateUnknown,
  location: formData.location?.trim() || null,
})

export default toAvalancheBody
