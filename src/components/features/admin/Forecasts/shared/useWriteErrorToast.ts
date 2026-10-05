'use client'

import { useToast } from '@components/hooks'
import { ForecastPublishRejectedError, ForecastWriteDeniedError } from '@data/hooks/forecasts'
import { useTranslations } from 'next-intl'

// A refused write (no permission, or the forecast is gone) isn't a bug: say so, don't report it
const useWriteErrorToast = () => {
  const t = useTranslations()
  const { toastError } = useToast()

  return (scope: string, error: unknown) => {
    if (error instanceof ForecastWriteDeniedError) {
      return toastError(scope, { message: t('admin.forecasts.messages.writeDenied') })
    }

    if (error instanceof ForecastPublishRejectedError) {
      return toastError(scope, { message: t('admin.forecasts.messages.publishRejected') })
    }

    return toastError(scope, { error })
  }
}

export default useWriteErrorToast
