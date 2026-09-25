import { startOfToday } from 'date-fns'

import type { ObservationSubmitFormSchema } from './schema'

const emptyAspects = { alpine: [], highAlpine: [], subAlpine: [] }

// Most reports are about today — "Today" is preselected
const getInitialFormData = (): ObservationSubmitFormSchema => ({
  aspects: emptyAspects,
  date: startOfToday(),
  description: null,
  honeypot: '',
  isDateUnknown: false,
  latitude: null,
  longitude: null,
  photos: [],
  quantity: 1,
  rememberDetails: false,
  size: null,
  slabDepth: null,
  submitterContact: null,
  submitterEducation: null,
  submitterName: '',
  trigger: '',
  type: '',
  width: null,
})

export default getInitialFormData
