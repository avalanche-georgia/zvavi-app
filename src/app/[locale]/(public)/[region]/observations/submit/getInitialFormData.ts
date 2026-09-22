import type { ObservationSubmitFormSchema } from './schema'

const emptyAspects = { alpine: [], highAlpine: [], subAlpine: [] }

const getInitialFormData = (): ObservationSubmitFormSchema => ({
  aspects: emptyAspects,
  date: null,
  description: null,
  honeypot: '',
  isDateUnknown: true,
  latitude: null,
  longitude: null,
  size: 1,
  submitterContact: null,
  submitterEducation: null,
  submitterName: null,
  trigger: null,
  type: null,
})

export default getInitialFormData
