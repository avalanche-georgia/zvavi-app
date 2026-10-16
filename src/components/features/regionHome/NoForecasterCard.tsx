import { getButtonClasses } from '@ds/primitives'
import { UserRoundSearch } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// In place of the danger card while the region has never had a forecast:
// we're looking for someone to write them
const NoForecasterCard = () => {
  const t = useTranslations()

  return (
    <section className="rounded-card border-rule bg-surface flex flex-col items-center gap-2 border px-4 py-8 text-center">
      <UserRoundSearch aria-hidden className="text-disabled size-10" />
      <h2 className="text-heading font-bold">{t('forecast.noForecaster.title')}</h2>
      <p className="text-body text-copy max-w-95">{t('forecast.noForecaster.message')}</p>
      <Link
        className={getButtonClasses({ className: 'mt-2', size: 'sm' })}
        href={routes.about.joinUs}
      >
        {t('forecast.noForecaster.action')}
      </Link>
    </section>
  )
}

export default NoForecasterCard
