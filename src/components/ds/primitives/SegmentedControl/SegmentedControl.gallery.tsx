'use client'

import { useState } from 'react'

import SegmentedControl from './SegmentedControl'
import Badge from '../Badge/Badge'

const SegmentedControlGallery = () => {
  const [kind, setKind] = useState('avalanche')

  return (
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
  )
}

export default SegmentedControlGallery
