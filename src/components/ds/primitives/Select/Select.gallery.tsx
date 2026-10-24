'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

import Select from './Select'
import Field from '../Field/Field'

const statusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Under review', value: 'pending' },
  { label: 'Archived', value: 'archived' },
]

const filterOptions = [{ label: 'All statuses', value: 'all' }, ...statusOptions]

const SelectGallery = () => {
  const [status, setStatus] = useState<string | null>('published')
  const [empty, setEmpty] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

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
      <Field label="Size sm, active while filtering (filter bars)">
        <Select
          className="max-w-64"
          isActive={filter !== 'all'}
          onValueChange={setFilter}
          options={filterOptions}
          size="sm"
          value={filter}
        />
      </Field>
      <Field label="Leading icon, value hidden on phones (tight toolbar)">
        <Select
          ariaLabel="Sort"
          className="w-auto"
          isValueHiddenOnPhone
          leading={<ArrowUpDown aria-hidden className="size-4" />}
          onValueChange={setFilter}
          options={filterOptions}
          size="sm"
          value={filter}
        />
      </Field>
    </div>
  )
}

export default SelectGallery
