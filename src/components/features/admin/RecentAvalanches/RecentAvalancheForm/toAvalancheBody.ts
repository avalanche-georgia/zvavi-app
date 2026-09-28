import { toDateOnlyIso } from '@components/features/observations/form'

import type { AvalancheFormData } from './schema'

// Validated form fields → the admin API's fields. Empty text is stored as null.
// Photos aren't included: create and update take them differently.
const toAvalancheBody = (formData: Omit<AvalancheFormData, 'photos'>) => ({
  ...formData,
  date: formData.date && !formData.isDateUnknown ? toDateOnlyIso(formData.date) : null,
  description: formData.description?.trim() || null,
  involvement: formData.involvement?.trim() || null,
  location: formData.location?.trim() || null,
})

export default toAvalancheBody
