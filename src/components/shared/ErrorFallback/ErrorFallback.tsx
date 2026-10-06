'use client'

import { useEffect } from 'react'
import { Button } from '@components/ui'
import { useTranslations } from 'next-intl'

import { reportError } from '@/lib/observability'

type ErrorFallbackProps = {
  error: Error & { digest?: string }
  reset: VoidFunction
}

// Shared UI for route error boundaries (error.tsx)
const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
  const t = useTranslations()

  useEffect(() => {
    // A digest means the error was thrown on the server and is already reported there
    // (instrumentation.ts onRequestError); the client only gets a redacted copy
    if (error.digest) return

    reportError(error, { scope: 'errorBoundary' })
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 py-12 md:p-6">
      <p className="text-gray-600">{t('common.messages.error')}</p>
      <Button onClick={reset} variant="secondary">
        {t('common.actions.tryAgain')}
      </Button>
    </div>
  )
}

export default ErrorFallback
