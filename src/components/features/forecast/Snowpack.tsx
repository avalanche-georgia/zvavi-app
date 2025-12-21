import { Spoiler } from '@components/shared'
import { useTranslations } from 'next-intl'

const Snowpack = ({ snowpack }: { snowpack: string }) => {
  const t = useTranslations()

  return (
    <Spoiler title={t('forecast.sections.snowpack.title')}>
      <p>{snowpack}</p>
    </Spoiler>
  )
}

export default Snowpack
