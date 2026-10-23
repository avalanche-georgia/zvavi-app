'use client'

import dynamic from 'next/dynamic'

// The live forecast (ForecastContainer refetches in the browser, so it brings supabase-js),
// split into its own chunk: a page that may render either it or a static ForecastPage
// only downloads it when it renders it
const LiveForecast = dynamic(() => import('./ForecastContainer'))

export default LiveForecast
