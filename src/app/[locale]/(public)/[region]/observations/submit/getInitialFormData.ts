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
  quantity: 1,
  size: 1,
  slabDepth: null,
  submitterContact: null,
  submitterEducation: null,
  submitterName: '',
  trigger: '',
  type: '',
  width: null,
})

export default getInitialFormData
