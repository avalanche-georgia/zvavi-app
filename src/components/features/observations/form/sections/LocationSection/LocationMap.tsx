'use client'

import { Spinner } from '@components/ui'
import dynamic from 'next/dynamic'

import type { LocationMapClientProps } from './LocationMapClient'

// Leaflet touches `window` on import — load the map on the client only
const LocationMapClient = dynamic(() => import('./LocationMapClient'), {
  loading: () => (
    <div className="bg-map rounded-media -mx-1 flex h-65 items-center justify-center md:mx-0 md:h-80">
      <Spinner />
    </div>
  ),
  ssr: false,
})

// eslint-disable-next-line react/jsx-props-no-spreading
const LocationMap = (props: LocationMapClientProps) => <LocationMapClient {...props} />

export default LocationMap
