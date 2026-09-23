import { useTranslations } from 'next-intl'

const ObservationsEmptyState = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-gray-50 py-16 text-center">
      <p className="text-gray-500">{t('observations.empty')}</p>
    </div>
  )
}

export default ObservationsEmptyState
