import { ButtonLink } from '@components/shared'
import { MountainSnow } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const HistoryEmptyState = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <MountainSnow className="text-gray-300" size={56} />
      <h2 className="text-2xl font-semibold text-gray-900">{t('forecast.history.emptyTitle')}</h2>
      <p className="max-w-md text-gray-600">{t('forecast.history.empty')}</p>
      <ButtonLink href={routes.home}>{t('forecast.noForecast.backToHome')}</ButtonLink>
    </div>
  )
}

export default HistoryEmptyState
