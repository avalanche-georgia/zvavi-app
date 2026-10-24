'use client'

import { Loading } from '@components/shared'
import dynamic from 'next/dynamic'

const ForecastAreaMapClient = dynamic(() => import('./ForecastAreaMapClient'), {
  loading: () => <Loading className="bg-tile rounded-media h-100 w-full py-0" />,
  ssr: false,
})

export default ForecastAreaMapClient
