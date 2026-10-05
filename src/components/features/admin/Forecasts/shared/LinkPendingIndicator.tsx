'use client'

import { LoaderIcon } from 'lucide-react'
import { useLinkStatus } from 'next/link'

// Must render inside a <Link>: spins while that link's navigation is pending
const LinkPendingIndicator = () => {
  const { pending } = useLinkStatus()

  if (!pending) return null

  return <LoaderIcon aria-hidden className="text-muted ml-1.5 inline size-3.5 animate-spin" />
}

export default LinkPendingIndicator
