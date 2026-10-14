'use client'

import { Suspense } from 'react'
import { useIsClient } from '@components/hooks'

import Loading from './Loading'

// Wraps a page's client container. Queries start only in the browser, and the
// sidebar shares some of them (pending counts), so their data can land before
// the page hydrates and differ from the server's loading state. The page renders
// after hydration instead; Suspense covers useSearchParams.
const AdminPageBoundary = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient()
  const fallback = <Loading isPage />

  if (!isClient) return fallback

  return <Suspense fallback={fallback}>{children}</Suspense>
}

export default AdminPageBoundary
