import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const ViewNotFound = () => {
  const t = useTranslations()

  return (
    <div className="rounded-card border-rule bg-surface flex flex-col items-center gap-3 border p-6 text-center">
      <p className="text-body">{t('admin.forecast.notFound')}</p>
      <Link
        className="text-accent focus-ring rounded-sm hover:underline"
        href={routes.admin.forecasts.root}
      >
        {t('common.actions.backToList')}
      </Link>
    </div>
  )
}

export default ViewNotFound
