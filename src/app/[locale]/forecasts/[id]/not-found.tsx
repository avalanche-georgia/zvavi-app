import { PageWrapper } from '@components/layout'
import { getTranslations } from 'next-intl/server'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const ForecastNotFound = async () => {
  const t = await getTranslations()

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">{t('forecast.notFound.title')}</h1>
        <p className="max-w-md text-gray-600">{t('forecast.notFound.message')}</p>
        <Link
          className="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
          href={routes.currentForecast}
        >
          {t('forecast.notFound.linkText')}
        </Link>
      </div>
    </PageWrapper>
  )
}

export default ForecastNotFound
