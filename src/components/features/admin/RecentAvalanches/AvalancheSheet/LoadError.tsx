import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Loading the record failed (network, expired session) — distinct from not found
const LoadError = ({ onRetry }: { onRetry: VoidFunction }) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <p className="text-muted text-sm">{t('common.messages.error')}</p>
      <Button onClick={onRetry} size="sm" variant="secondary">
        {t('common.actions.tryAgain')}
      </Button>
    </div>
  )
}

export default LoadError
