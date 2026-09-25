'use client'

import { useState } from 'react'

import Checkbox from './Checkbox'
import InfoTip from '../InfoTip/InfoTip'

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
      <Checkbox
        checked={isChecked}
        label="With info tip"
        labelAside={
          <InfoTip ariaLabel="How it works">Details live in a tap-or-hover popup.</InfoTip>
        }
        onCheckedChange={setIsChecked}
      />
    </div>
  )
}

export default CheckboxGallery
