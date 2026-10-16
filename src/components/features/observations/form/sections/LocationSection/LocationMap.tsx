'use client'

import { Loading } from '@components/shared'
import dynamic from 'next/dynamic'

import type { LocationMapClientProps } from './LocationMapClient'

const MapLoading = () => {
  return <Loading className="bg-map rounded-media -mx-1 h-65 py-0 md:mx-0 md:h-80" />
}

// Leaflet touches `window` on import — load the map on the client only
const LocationMapClient = dynamic(() => import('./LocationMapClient'), {
  loading: MapLoading,
  ssr: false,
})

// eslint-disable-next-line react/jsx-props-no-spreading
const LocationMap = (props: LocationMapClientProps) => <LocationMapClient {...props} />

export default LocationMap
