'use client'

import { Loading } from '@components/shared'
import dynamic from 'next/dynamic'

import type { StationLocationMapClientProps } from './StationLocationMapClient'

const MapLoading = () => {
  return <Loading className="bg-map rounded-media -mx-1 h-65 py-0 md:mx-0 md:h-80" />
}

// Leaflet touches `window` on import — load the map on the client only
const StationLocationMapClient = dynamic(() => import('./StationLocationMapClient'), {
  loading: MapLoading,
  ssr: false,
})

const StationLocationMap = (props: StationLocationMapClientProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StationLocationMapClient {...props} />
)

export default StationLocationMap
