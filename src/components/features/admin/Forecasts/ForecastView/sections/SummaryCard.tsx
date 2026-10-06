import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ProseText from './ProseText'

const SummaryCard = ({ summary }: { summary: string | null }) => {
  const t = useTranslations()

  return (
    <FormCard title={t('admin.forecast.form.general.labels.summary')}>
      <ProseText
        className="text-copy-lg leading-[1.6]"
        placeholder={t('admin.forecasts.view.notWritten')}
        text={summary}
      />
    </FormCard>
  )
}

export default SummaryCard
