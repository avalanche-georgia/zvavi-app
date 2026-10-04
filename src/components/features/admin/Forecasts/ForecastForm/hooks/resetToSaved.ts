import isEqual from 'lodash/isEqual'
import type { UseFormReturn } from 'react-hook-form'

import type { ForecastFormSchema } from '../schema'

// The saved values become the clean state. Anything typed while the save was in
// flight is put back on top, still dirty, instead of being wiped.
const resetToSaved = (form: UseFormReturn<ForecastFormSchema>, saved: ForecastFormSchema) => {
  const current = form.getValues()

  form.reset(saved)

  const names = Object.keys(saved) as (keyof ForecastFormSchema)[]

  names.forEach((name) => {
    if (isEqual(current[name], saved[name])) return

    form.setValue(name, current[name], { shouldDirty: true })
  })
}

export default resetToSaved
