'use client'

import { Spinner } from '@components/ui'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Leaflet
const ForecastAreaMap = dynamic(() => import('./ForecastAreaMap'), {
  loading: () => (
    <div className="relative flex h-[400px] w-full items-center justify-center rounded-xl bg-gray-100">
      <Spinner />
    </div>
  ),
  ssr: false,
})

export default ForecastAreaMap
