'use client'

import { Collapsible } from '@base-ui/react/collapsible'
import { ChevronDown } from 'lucide-react'

import { sectionAnchorClasses, sectionLabelClasses } from './SectionCard'
import type { SectionId } from '../model/sections'

import { cn } from '@/lib/utils'

type CollapsibleCardProps = {
  children: React.ReactNode
  className?: string
  count?: number
  // Anchor for the jump bar
  id?: SectionId
  isInitiallyOpen?: boolean
  title: string
}

// A section card whose heading folds its content away
const CollapsibleCard = ({
  children,
  className,
  count,
  id,
  isInitiallyOpen = true,
  title,
}: CollapsibleCardProps) => (
  <Collapsible.Root
    className={cn(
      'rounded-card border-rule bg-surface min-w-0 border outline-hidden',
      id && sectionAnchorClasses,
      className,
    )}
    defaultOpen={isInitiallyOpen}
    id={id}
    render={<section />}
    // Focusable from the jump bar only
    tabIndex={id ? -1 : undefined}
  >
    <h2 className="m-0">
      <Collapsible.Trigger
        className={cn(
          sectionLabelClasses,
          'group rounded-card focus-ring flex w-full items-center gap-2 p-4 text-left lg:px-5',
        )}
      >
        {title}
        {count !== undefined && (
          <span className="bg-tile text-ink rounded-md px-1.5 py-px text-xs tracking-normal">
            {count}
          </span>
        )}
        <ChevronDown
          aria-hidden
          className="ml-auto size-4.5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180"
        />
      </Collapsible.Trigger>
    </h2>
    <Collapsible.Panel className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
      <div className="px-4 pb-4 lg:px-5 lg:pb-5">{children}</div>
    </Collapsible.Panel>
  </Collapsible.Root>
)

export default CollapsibleCard
