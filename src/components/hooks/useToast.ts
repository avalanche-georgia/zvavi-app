import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { reportError } from '@/lib/observability'

type ToastData = {
  message?: string
  error?: string | unknown
}

const useToast = () => {
  const t = useTranslations()

  const toastError = (scope: string, { error, message }: ToastData) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`${scope}: `, error)
      reportError(error instanceof Error ? error : new Error(String(error)), { scope })
    }

    return toast.error(message ?? t('common.messages.error'), {
      className: '!bg-red-100 border !border-red-300 !text-red-700',
    })
  }

  const toastSuccess = (message?: string) =>
    toast.success(message ?? t('common.messages.success'), {
      className: '!bg-green-100 border !border-green-300 !text-green-700',
    })

  const toastInfo = (message: string) =>
    toast.info(message, {
      className: '!bg-blue-100 border !border-blue-300 !text-blue-700',
    })

  return {
    toastError,
    toastInfo,
    toastSuccess,
  }
}

export default useToast
