'use client'

import { useState } from 'react'

import DateField from './DateField'
import { Field } from '../Field'

const DateFieldGallery = () => {
  const [date, setDate] = useState<Date | null>(null)
  const [dateTime, setDateTime] = useState<Date | null>(null)

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Field label="Date">
        <DateField onValueChange={setDate} value={date} />
      </Field>
      <Field label="Valid until" required>
        <DateField onValueChange={setDateTime} timeLabel="Time" value={dateTime} withTime />
      </Field>
      <DateField ariaLabel="Created from" className="w-37.5" onValueChange={setDate} value={date} />
      <Field error="Pick when this forecast expires." label="With error">
        <DateField onValueChange={() => undefined} value={null} withTime />
      </Field>
    </div>
  )
}

export default DateFieldGallery
