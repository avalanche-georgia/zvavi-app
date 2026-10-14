import useForecastDates from '@components/features/forecast/model/useForecastDates'
import { useTranslations } from 'next-intl'

// Today's date, the page title and what the forecasts are
const HeroIntro = ({ now }: { now: string }) => {
  const t = useTranslations()
  const { formatLongDay } = useForecastDates()

  return (
    <div className="mb-5">
      <p className="text-caption text-muted font-semibold tracking-[.06em] uppercase">
        {formatLongDay(now)}
      </p>
      <h1 className="text-title lg:text-display my-1.5 font-bold text-balance">
        {t('home.hero.title')}
      </h1>
      <p className="text-body text-copy-lg text-pretty">{t('home.hero.lede')}</p>
    </div>
  )
}

export default HeroIntro
