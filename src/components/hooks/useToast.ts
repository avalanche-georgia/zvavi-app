import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

type ToastData = {
  message?: string
  error?: string | unknown
}

// Border in the toast's own colour, faded: no -border tokens for accent / success yet
const infoClassName = 'bg-accent-soft! border border-current/25! text-accent!'

// Opaque: a toast floats over maps and lists. The danger tint mixed into white until a danger-soft
// token exists
const errorClassName =
  'bg-[color-mix(in_oklab,var(--color-danger)_10%,var(--color-surface))]! border border-danger-border! text-danger!'

const useToast = () => {
  const t = useTranslations()

  // Shows the message only: failed requests are reported centrally (QueryClientProvider), and
  // expected errors such as a wrong password must not be reported
  const toastError = (scope: string, { error, message }: ToastData) => {
    if (error) {
      console.error(`${scope}: `, error)
    }

    return toast.error(message ?? t('common.messages.error'), {
      className: errorClassName,
    })
  }

  const toastSuccess = (message?: string) =>
    toast.success(message ?? t('common.messages.success'), {
      className: 'bg-success-soft! border border-current/25! text-success!',
    })

  const toastInfo = (message: string) => toast.info(message, { className: infoClassName })

  // An info toast with an action, e.g. Undo after a removal
  const toastAction = (message: string, action: { label: string; onClick: VoidFunction }) =>
    toast.info(message, {
      action,
      className: infoClassName,
      classNames: { actionButton: 'bg-accent! text-white! font-semibold! rounded-item!' },
      duration: 5200,
    })

  return {
    toastAction,
    toastError,
    toastInfo,
    toastSuccess,
  }
}

export default useToast
