'use client'

import { useState } from 'react'

import Select from './Select'
import Field from '../Field/Field'

const statusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Under review', value: 'pending' },
  { label: 'Archived', value: 'archived' },
]

const SelectGallery = () => {
  const [status, setStatus] = useState<string | null>('published')
  const [empty, setEmpty] = useState<string | null>(null)

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Status">
        <Select onValueChange={setStatus} options={statusOptions} value={status} />
      </Field>
      <Field label="With placeholder">
        <Select
          onValueChange={setEmpty}
          options={statusOptions}
          placeholder="Pick one…"
          value={empty}
        />
      </Field>
      <Field error="Pick a status." label="With error" required>
        <Select onValueChange={setEmpty} options={statusOptions} value={empty} />
      </Field>
      <Field label="Disabled">
        <Select disabled onValueChange={setStatus} options={statusOptions} value={status} />
      </Field>
    </div>
  )
}

export default SelectGallery
