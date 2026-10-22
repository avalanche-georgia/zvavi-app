'use client'

import { useState } from 'react'

import SegmentedControl from './SegmentedControl'
import Badge from '../Badge/Badge'

const SegmentedControlGallery = () => {
  const [kind, setKind] = useState('avalanche')
  const [dateBasis, setDateBasis] = useState('occurred')
  const [language, setLanguage] = useState('en')

  return (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl
        ariaLabel="Observation type"
        className="max-w-md"
        onChange={setKind}
        options={[
          { label: 'Avalanche', value: 'avalanche' },
          {
            ariaLabel: 'Snowpack test — coming soon',
            disabled: true,
            label: (
              <>
                Snowpack test <Badge>Soon</Badge>
              </>
            ),
            value: 'snowpack',
          },
        ]}
        value={kind}
      />
      <SegmentedControl
        ariaLabel="Date basis"
        onChange={setDateBasis}
        options={[
          { label: 'Occurred', value: 'occurred' },
          { label: 'Reported', value: 'reported' },
        ]}
        size="sm"
        value={dateBasis}
      />
      <SegmentedControl
        ariaLabel="Language"
        onChange={setLanguage}
        options={[
          { label: 'EN', value: 'en' },
          { label: 'ქარ', value: 'ka' },
        ]}
        size="xs"
        value={language}
      />
    </div>
  )
}

export default SegmentedControlGallery
