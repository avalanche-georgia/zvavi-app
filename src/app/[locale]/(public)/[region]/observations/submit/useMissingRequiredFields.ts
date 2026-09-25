import { useFormContext, useWatch } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const requiredFields = ['date', 'location', 'type', 'trigger', 'size', 'submitterName'] as const

type RequiredField = (typeof requiredFields)[number]

// Live list of required fields still empty — drives the submit bar status
const useMissingRequiredFields = (): RequiredField[] => {
  const { control } = useFormContext<ObservationSubmitFormSchema>()
  const [date, isDateUnknown, latitude, longitude, type, trigger, size, submitterName] = useWatch({
    control,
    name: [
      'date',
      'isDateUnknown',
      'latitude',
      'longitude',
      'type',
      'trigger',
      'size',
      'submitterName',
    ],
  })

  const isFilled: Record<RequiredField, boolean> = {
    // "Pick a date" chosen but left empty
    date: isDateUnknown || date !== null,
    location: latitude != null && longitude != null,
    size: size != null,
    submitterName: !!submitterName?.trim(),
    trigger: !!trigger,
    type: !!type,
  }

  return requiredFields.filter((field) => !isFilled[field])
}

export default useMissingRequiredFields
