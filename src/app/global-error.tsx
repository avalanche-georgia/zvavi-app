'use client'

import { useEffect } from 'react'

import { reportError } from '@/lib/observability'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: VoidFunction
}

// Replaces the root layout when it fails, so no providers or translations are available here
const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    // Server errors (with a digest) are already reported by instrumentation.ts
    if (error.digest) return

    reportError(error, { scope: 'globalErrorBoundary' })
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, sans-serif',
          gap: 16,
          justifyContent: 'center',
          minHeight: '100dvh',
        }}
      >
        <p>Something went wrong. Please try again later.</p>
        <button onClick={reset} type="button">
          Try again
        </button>
      </body>
    </html>
  )
}

export default GlobalError
