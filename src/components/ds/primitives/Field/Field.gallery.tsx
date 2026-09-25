'use client'

import { useState } from 'react'

import Field from './Field'
import NumberField from '../NumberField/NumberField'
import Textarea from '../Textarea/Textarea'
import TextField from '../TextField/TextField'

const FieldGallery = () => {
  const [name, setName] = useState('')
  const [depth, setDepth] = useState<number | null>(null)
  const [notes, setNotes] = useState('')

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Your name" required>
        <TextField onValueChange={setName} placeholder="Jane Doe" value={name} />
      </Field>
      <Field hint="Optional · only our team sees it" label="Contact">
        <TextField onValueChange={setName} placeholder="Email, phone…" value={name} />
      </Field>
      <Field error="Add your name." label="With error" required>
        <TextField onValueChange={setName} value={name} />
      </Field>
      <Field description="Shown under the control." label="With description">
        <TextField disabled onValueChange={setName} placeholder="Disabled" value="" />
      </Field>
      <Field label="Slab depth">
        <NumberField onValueChange={setDepth} placeholder="—" unit="cm" value={depth} />
      </Field>
      <Field hint="Optional" label="Notes">
        <Textarea onValueChange={setNotes} placeholder="Anything else…" value={notes} />
      </Field>
    </div>
  )
}

export default FieldGallery
