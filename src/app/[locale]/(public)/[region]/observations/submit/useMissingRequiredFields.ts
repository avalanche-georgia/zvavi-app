import { useFormContext, useWatch } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

export const requiredFields = ['location', 'type', 'trigger', 'size', 'submitterName'] as const

export type RequiredField = (typeof requiredFields)[number]

// Live list of required fields still empty — drives the submit bar status
const useMissingRequiredFields = (): RequiredField[] => {
  const { control } = useFormContext<ObservationSubmitFormSchema>()
  const [latitude, longitude, type, trigger, size, submitterName] = useWatch({
    control,
    name: ['latitude', 'longitude', 'type', 'trigger', 'size', 'submitterName'],
  })

  const isFilled: Record<RequiredField, boolean> = {
    location: latitude != null && longitude != null,
    size: size != null,
    submitterName: !!submitterName?.trim(),
    trigger: !!trigger,
    type: !!type,
  }

  return requiredFields.filter((field) => !isFilled[field])
}

export default useMissingRequiredFields
