import type { SectionId } from '../model/sections'

import { cn } from '@/lib/utils'

type SectionCardProps = {
  children: React.ReactNode
  className?: string
  count?: number
  // Anchor for the jump bar
  id?: SectionId
  title: string
}

export const sectionLabelClasses =
  'text-muted text-copy-sm font-semibold tracking-[.05em] uppercase'

// Sections land below the sticky site header (and the sticky jump bar on mobile)
export const sectionAnchorClasses =
  'scroll-mt-[calc(var(--forecast-header-height)+64px)] lg:scroll-mt-[calc(var(--forecast-header-height)+16px)]'

// White bordered card with an uppercase label and an optional item count
const SectionCard = ({ children, className, count, id, title }: SectionCardProps) => (
  <section
    className={cn(
      'rounded-card border-rule bg-surface min-w-0 border p-4 lg:p-5',
      sectionAnchorClasses,
      className,
    )}
    id={id}
  >
    <h2 className={cn(sectionLabelClasses, 'mb-3 flex items-baseline gap-2')}>
      {title}
      {count !== undefined && (
        <span className="bg-tile text-ink rounded-md px-1.5 py-px text-xs tracking-normal">
          {count}
        </span>
      )}
    </h2>
    {children}
  </section>
)

export default SectionCard
