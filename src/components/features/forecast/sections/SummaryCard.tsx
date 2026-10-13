import { useTranslations } from 'next-intl'

import Prose from './Prose'
import SectionCard from './SectionCard'

type SummaryCardProps = {
  className?: string
  summary: string
}

const SummaryCard = ({ className, summary }: SummaryCardProps) => {
  const t = useTranslations()

  return (
    <SectionCard className={className} id="summary" title={t('common.labels.summary')}>
      <Prose className="text-copy-lg leading-[1.6]" content={summary} />
    </SectionCard>
  )
}

export default SummaryCard
