'use client'

import { Collapsible } from '@base-ui/react/collapsible'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Prose from './Prose'
import { sectionAnchorClasses, sectionLabelClasses } from './SectionCard'

import { cn } from '@/lib/utils'

type SummaryCardProps = {
  className?: string
  summary: string
}

// The forecaster's summary, collapsed until the reader opens it
const SummaryCard = ({ className, summary }: SummaryCardProps) => {
  const t = useTranslations()

  return (
    <Collapsible.Root
      className={cn(
        'rounded-card border-rule bg-surface min-w-0 border outline-hidden',
        sectionAnchorClasses,
        className,
      )}
      id="summary"
      render={<section />}
      tabIndex={-1}
    >
      <h2 className="m-0">
        <Collapsible.Trigger
          className={cn(
            sectionLabelClasses,
            'group rounded-card focus-ring flex w-full items-center justify-between gap-2 p-4 text-left lg:px-5',
          )}
        >
          {t('common.labels.summary')}
          <ChevronDown
            aria-hidden
            className="size-4.5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180"
          />
        </Collapsible.Trigger>
      </h2>
      <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <Prose className="text-copy-lg px-4 pb-4 leading-[1.6] lg:px-5 lg:pb-5" content={summary} />
      </Collapsible.Panel>
    </Collapsible.Root>
  )
}

export default SummaryCard
