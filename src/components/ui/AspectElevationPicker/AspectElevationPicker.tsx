'use client'

import { useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { sortedAspects } from '@domain/constants'
import type { Aspect, Aspects, ElevationZone } from '@domain/types'

import AspectCompass from './AspectCompass'
import CopyChips from './CopyChips'
import PickerSummary from './PickerSummary'
import ZoneTabs from './ZoneTabs'

import { cn } from '@/lib/utils'

type AspectElevationPickerProps = {
  className?: string
  onChange: (value: Aspects) => void
  value: Aspects
}

const emptyValue: Aspects = { alpine: [], highAlpine: [], subAlpine: [] }

// Controlled multi-select of elevation zone × aspect combinations: pick a zone
// tab, then tap or drag across the compass. Zone aspects are kept in compass order.
const AspectElevationPicker = ({ className, onChange, value }: AspectElevationPickerProps) => {
  const [activeZone, setActiveZone] = useState<ElevationZone>('highAlpine')

  const handleZoneChange = (zone: ElevationZone, aspects: Aspect[]) =>
    onChange({ ...value, [zone]: sortedAspects.filter((aspect) => aspects.includes(aspect)) })

  const handleActiveZoneAspectsChange = (aspects: Aspect[]) => handleZoneChange(activeZone, aspects)

  const handleClear = () => onChange(emptyValue)

  return (
    <Tabs.Root
      className={cn(
        'border-rule flex w-full max-w-sm flex-col gap-3 rounded-2xl border p-3',
        className,
      )}
      onValueChange={setActiveZone}
      value={activeZone}
    >
      <ZoneTabs value={value} />
      {/* The compass buttons are the tab stops — the panel itself needn't be one */}
      <Tabs.Panel tabIndex={-1} value={activeZone}>
        <AspectCompass
          aspects={value[activeZone]}
          onChange={handleActiveZoneAspectsChange}
          zone={activeZone}
        />
      </Tabs.Panel>
      <CopyChips activeZone={activeZone} onZoneChange={handleZoneChange} value={value} />
      <PickerSummary onClear={handleClear} value={value} />
    </Tabs.Root>
  )
}

export default AspectElevationPicker
