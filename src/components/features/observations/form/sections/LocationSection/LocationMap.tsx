'use client'

import { Spinner } from '@ds/primitives'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

import type { LocationMapClientProps } from './LocationMapClient'

const MapLoading = () => {
  const t = useTranslations()

  return (
    <div className="bg-map rounded-media -mx-1 flex h-65 items-center justify-center md:mx-0 md:h-80">
      <Spinner label={t('common.messages.loading')} />
    </div>
  )
}

// Leaflet touches `window` on import — load the map on the client only
const LocationMapClient = dynamic(() => import('./LocationMapClient'), {
  loading: MapLoading,
  ssr: false,
})

// eslint-disable-next-line react/jsx-props-no-spreading
const LocationMap = (props: LocationMapClientProps) => <LocationMapClient {...props} />

export default LocationMap
