import { MarkdownContent, Spoiler } from '@components/shared'
import { useTranslations } from 'next-intl'

const Weather = ({ weather }: { weather: string }) => {
  const t = useTranslations()

  return (
    <Spoiler title={t('forecast.sections.weather.title')}>
      <MarkdownContent content={weather} />
    </Spoiler>
  )
}

export default Weather
