'use client'

import { startTransition, useEffect } from 'react'
import { Button } from '@ds/primitives'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { reportError } from '@/lib/observability'

type ErrorFallbackProps = {
  error: Error & { digest?: string }
  reset: VoidFunction
}

// Shared UI for route error boundaries (error.tsx)
const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  const t = useTranslations()
  const router = useRouter()

  useEffect(() => {
    // A digest means the error was thrown on the server and is already reported there
    // (instrumentation.ts onRequestError); the client only gets a redacted copy
    if (error.digest) return

    reportError(error, { scope: 'errorBoundary' })
  }, [error])

  // reset() alone re-renders the server data that failed; refresh fetches it again first
  const handleRetry = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 py-12 md:p-6">
      <p className="text-muted" role="alert">
        {t('common.messages.error')}
      </p>
      <Button onClick={handleRetry} variant="secondary">
        {t('common.actions.tryAgain')}
      </Button>
    </div>
  )
}

export default ErrorFallback
