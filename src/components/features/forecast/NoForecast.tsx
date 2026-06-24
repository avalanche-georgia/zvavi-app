import { ButtonLink } from '@components'
import { Snowflake } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const NoForecast = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <Snowflake className="text-gray-300" size={56} />
      <h2 className="text-2xl font-semibold text-gray-900">{t('forecast.noForecast.title')}</h2>
      <p className="max-w-md text-gray-600">{t('forecast.noForecast.message')}</p>
      <ButtonLink href={routes.home}>{t('forecast.noForecast.backToHome')}</ButtonLink>
    </div>
  )
}

export default NoForecast
