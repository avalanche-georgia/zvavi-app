'use client'

import { Spinner } from '@components/ui'
import dynamic from 'next/dynamic'

const ForecastAreaMapClient = dynamic(() => import('./ForecastAreaMapClient'), {
  loading: () => (
    <div className="relative flex h-[400px] w-full items-center justify-center rounded-xl bg-gray-100">
      <Spinner />
    </div>
  ),
  ssr: false,
})

export default ForecastAreaMapClient
