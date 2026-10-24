'use client'

import { lazy } from 'react'

// The live forecast (ForecastContainer refetches in the browser, so it brings supabase-js),
// split into its own chunk: a page that may render either it or a static ForecastPage
// only downloads it when it renders it.
// Plain React.lazy, not next/dynamic: next/dynamic renders the lazy component as the second
// of two children, and when hydration suspends on the chunk and resumes, React drops that
// position from the useId path — every base-ui id below would differ from the server's
const LiveForecast = lazy(() => import('./ForecastContainer'))

export default LiveForecast
