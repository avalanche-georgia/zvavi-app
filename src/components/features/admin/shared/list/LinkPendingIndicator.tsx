'use client'

import { Spinner } from '@ds/primitives'
import { useLinkStatus } from 'next/link'

// Must render inside a <Link>: spins while that link's navigation is pending
const LinkPendingIndicator = () => {
  const { pending } = useLinkStatus()

  if (!pending) return null

  return <Spinner className="text-muted ml-1.5 align-middle" size="sm" />
}

export default LinkPendingIndicator
