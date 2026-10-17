'use client'

import { Loading } from '@components/shared'
import dynamic from 'next/dynamic'

import type { StationsMapClientProps } from './StationsMapClient'

const MapLoading = () => {
  return <Loading className="bg-map size-full py-0" />
}

// Leaflet touches `window` on import — load the map on the client only
const StationsMapClient = dynamic(() => import('./StationsMapClient'), {
  loading: MapLoading,
  ssr: false,
})

// eslint-disable-next-line react/jsx-props-no-spreading
const StationsMap = (props: StationsMapClientProps) => <StationsMapClient {...props} />

export default StationsMap
