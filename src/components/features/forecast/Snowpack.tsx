import { MarkdownContent, Spoiler } from '@components/shared'
import { useTranslations } from 'next-intl'

const Snowpack = ({ snowpack }: { snowpack: string }) => {
  const t = useTranslations()

  return (
    <Spoiler title={t('forecast.sections.snowpack.title')}>
      <MarkdownContent content={snowpack} />
    </Spoiler>
  )
}

export default Snowpack
