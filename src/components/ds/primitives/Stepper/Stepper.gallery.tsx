'use client'

import { useState } from 'react'

import Stepper from './Stepper'
import Field from '../Field/Field'

const StepperGallery = () => {
  const [count, setCount] = useState(1)

  return (
    <Field className="max-w-sm" label="How many?" orientation="horizontal">
      <Stepper
        decrementLabel="Fewer"
        incrementLabel="More"
        max={5}
        min={1}
        onValueChange={setCount}
        value={count}
      />
    </Field>
  )
}

export default StepperGallery
