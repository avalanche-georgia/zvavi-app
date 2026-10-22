'use client'

import { useState } from 'react'

import Switch from './Switch'
import InfoTip from '../InfoTip/InfoTip'

const SwitchGallery = () => {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch checked={isOn} label="Plain" onCheckedChange={setIsOn} />
      <Switch
        checked={isOn}
        label="Unlinked"
        labelAside={
          <InfoTip ariaLabel="About this filter">Only records no forecast links to.</InfoTip>
        }
        onCheckedChange={setIsOn}
      />
      <Switch
        checked={isOn}
        description="Active partners are shown on the public site."
        label="With description"
        onCheckedChange={setIsOn}
      />
      <Switch checked={isOn} isLabelHidden label="Hidden label" onCheckedChange={setIsOn} />
      <Switch checked isReadOnly label="Read-only" onCheckedChange={setIsOn} />
      <Switch checked isBusy label="Busy (saving)" onCheckedChange={setIsOn} />
    </div>
  )
}

export default SwitchGallery
