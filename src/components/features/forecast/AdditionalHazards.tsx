import { MarkdownContent, Spoiler } from '@components/shared'
import { useTranslations } from 'next-intl'

const AdditionalHazards = ({ additionalHazards }: { additionalHazards: string }) => {
  const t = useTranslations()

  return (
    <Spoiler title={t('forecast.sections.additionalHazards.title')}>
      <MarkdownContent content={additionalHazards} />
    </Spoiler>
  )
}

export default AdditionalHazards
