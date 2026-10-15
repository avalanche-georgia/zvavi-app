'use client'

import { Controller, useFormContext } from 'react-hook-form'

// A bot filling every visible field also fills this one — hidden off-screen,
// not display:none, since some bots specifically skip display:none inputs. The form
// needs a `honeypot: string` field; its route answers a filled one with a silent success.
const HoneypotField = () => {
  const form = useFormContext<{ honeypot: string }>()

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
