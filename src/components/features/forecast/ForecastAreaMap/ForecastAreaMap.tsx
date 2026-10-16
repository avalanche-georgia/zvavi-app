'use client'

import { Loading } from '@components/shared'
import dynamic from 'next/dynamic'

const ForecastAreaMapClient = dynamic(() => import('./ForecastAreaMapClient'), {
  loading: () => <Loading className="h-[400px] w-full rounded-xl bg-gray-100 py-0" />,
  ssr: false,
})

export default ForecastAreaMapClient
