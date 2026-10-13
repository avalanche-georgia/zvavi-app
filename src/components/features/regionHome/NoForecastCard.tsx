import { Snowflake } from 'lucide-react'
import { useTranslations } from 'next-intl'

// In place of the danger card while the region has no published forecast
const NoForecastCard = () => {
  const t = useTranslations()

  return (
    <section className="rounded-card border-rule bg-surface flex flex-col items-center gap-2 border px-4 py-8 text-center">
      <Snowflake aria-hidden className="text-disabled size-10" />
      <h2 className="text-heading font-bold">{t('forecast.noForecast.title')}</h2>
      <p className="text-body text-copy max-w-95">{t('forecast.noForecast.message')}</p>
    </section>
  )
}

export default NoForecastCard
