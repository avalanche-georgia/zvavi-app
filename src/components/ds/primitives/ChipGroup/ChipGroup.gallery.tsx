'use client'

import { useState } from 'react'

import ChipGroup from './ChipGroup'
import FieldGroup from '../Field/FieldGroup'

const options = ['Natural', 'Rider', 'Explosives', 'Vehicle', 'Unknown'].map((label) => ({
  label,
  value: label.toLowerCase(),
}))

const ChipGroupGallery = () => {
  const [trigger, setTrigger] = useState<string | null>(null)
  const [when, setWhen] = useState<string | null>('today')

  return (
    <div className="flex flex-col gap-5">
      <FieldGroup hint="Tap again to clear" label="Deselectable" required>
        <ChipGroup isDeselectable onChange={setTrigger} options={options} value={trigger} />
      </FieldGroup>
      <FieldGroup error="Pick a trigger." label="Always one (with error)">
        <ChipGroup
          onChange={setWhen}
          options={[
            { label: 'Today', value: 'today' },
            { label: 'Yesterday', value: 'yesterday' },
            { disabled: true, label: 'Disabled', value: 'disabled' },
          ]}
          value={when}
        />
      </FieldGroup>
    </div>
  )
}

export default ChipGroupGallery
