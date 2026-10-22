import { useTranslations } from 'next-intl'

import CollapsibleCard from './CollapsibleCard'
import Prose from './Prose'

type SummaryCardProps = {
  className?: string
  summary: string
}

const SummaryCard = ({ className, summary }: SummaryCardProps) => {
  const t = useTranslations()

  return (
    <CollapsibleCard className={className} id="summary" title={t('common.labels.summary')}>
      <Prose className="text-copy-lg leading-prose" content={summary} />
    </CollapsibleCard>
  )
}

export default SummaryCard
