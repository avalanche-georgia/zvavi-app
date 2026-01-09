import { PageWrapper } from '@components/layout'
import { getTranslations } from 'next-intl/server'
import { ButtonLink } from 'src/components/shared'

import { routes } from '@/routes'

const ForecastNotFound = async () => {
  const t = await getTranslations()

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">{t('forecast.notFound.title')}</h1>
        <p className="max-w-md text-gray-600">{t('forecast.notFound.message')}</p>
        <ButtonLink href={routes.forecasts.current}>{t('forecast.notFound.linkText')}</ButtonLink>
      </div>
    </PageWrapper>
  )
}

export default ForecastNotFound
