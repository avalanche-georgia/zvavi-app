'use client'

import { Button } from '@components/ui'
import { useTranslations } from 'next-intl'

type AdminErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const AdminError = ({ reset }: AdminErrorProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 py-12 md:p-6">
      <p className="text-gray-600">{t('common.messages.error')}</p>
      <Button onClick={reset} variant="secondary">
        {t('common.actions.tryAgain')}
      </Button>
    </div>
  )
}

export default AdminError
