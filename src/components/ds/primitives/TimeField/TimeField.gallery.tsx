'use client'

import { useState } from 'react'

import TimeField from './TimeField'
import { Field } from '../Field'

const TimeFieldGallery = () => {
  const [time, setTime] = useState<string | null>('18:00')
  const [empty, setEmpty] = useState<string | null>(null)
  const [quarter, setQuarter] = useState<string | null>('07:15')

  return (
    <div className="flex max-w-md flex-col gap-4">
      <Field description="Pick from the list or type: 1745, 9, 18:30" label="Valid until">
        <TimeField onValueChange={setTime} value={time} />
      </Field>
      <Field description="Empty; clears when emptied" label="From">
        <TimeField onValueChange={setEmpty} value={empty} />
      </Field>
      <Field description="Every 15 minutes, sm" label="Quarter hours">
        <TimeField onValueChange={setQuarter} size="sm" step={15} value={quarter} />
      </Field>
      <Field label="Disabled">
        <TimeField disabled onValueChange={() => undefined} value="12:00" />
      </Field>
      <Field error="Pick a time." label="With error">
        <TimeField onValueChange={() => undefined} value={null} />
      </Field>
    </div>
  )
}

export default TimeFieldGallery
