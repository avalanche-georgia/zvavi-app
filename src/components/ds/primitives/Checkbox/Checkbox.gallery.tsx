'use client'

import { useState } from 'react'

import Checkbox from './Checkbox'

const CheckboxGallery = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="flex max-w-md flex-col gap-2">
      <Checkbox checked={isChecked} label="Plain" onCheckedChange={setIsChecked} />
      <Checkbox
        checked={isChecked}
        description="Saved only in this browser to fill in this form next time."
        label="With description"
        onCheckedChange={setIsChecked}
      />
    </div>
  )
}

export default CheckboxGallery
