'use client'

import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

// A bot filling every visible field also fills this one — hidden off-screen,
// not display:none, since some bots specifically skip display:none inputs.
const HoneypotField = () => {
  const form = useFormContext<ObservationSubmitFormSchema>()

  return (
    <Controller
      control={form.control}
      name="honeypot"
      render={({ field }) => (
        <input
          aria-hidden="true"
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          onChange={field.onChange}
          tabIndex={-1}
          value={field.value}
        />
      )}
    />
  )
}

export default HoneypotField
