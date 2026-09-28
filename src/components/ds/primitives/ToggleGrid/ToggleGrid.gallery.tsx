'use client'

import { useState } from 'react'

import ToggleGrid from './ToggleGrid'
import FieldGroup from '../Field/FieldGroup'

const options = ['1', '2', '3', '4', '5'].map((value) => ({ label: value, value }))

const ToggleGridGallery = () => {
  const [size, setSize] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-md" hint="Destructive size" label="Size" required>
      <ToggleGrid onChange={setSize} options={options} value={size} />
    </FieldGroup>
  )
}

export default ToggleGridGallery
