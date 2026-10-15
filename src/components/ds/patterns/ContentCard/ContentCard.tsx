import { OctagonAlert, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ContentCardTone = 'danger' | 'default' | 'warning'

type ContentCardProps = {
  // Right of the title, e.g. a small link
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  // Anchor target for in-page links (#id)
  id?: string
  title: React.ReactNode
  // Highlights a section the reader must not miss (limits, safety)
  tone?: ContentCardTone
}

const toneClasses: Record<ContentCardTone, string> = {
  danger: 'border-danger-border bg-danger/5',
  default: 'border-rule bg-surface',
  warning: 'border-transparent bg-warning-soft',
}

const toneTitleClasses: Record<ContentCardTone, string> = {
  danger: 'text-danger',
  default: '',
  warning: 'text-warning',
}

const toneIcons: Record<ContentCardTone, React.ElementType | null> = {
  danger: OctagonAlert,
  default: null,
  warning: TriangleAlert,
}

// A section of a reading page: card, H2 title, content below
const ContentCard = ({
  action,
  children,
  className,
  id,
  title,
  tone = 'default',
}: ContentCardProps) => {
  const Icon = toneIcons[tone]

  return (
    <section
      className={cn('rounded-card scroll-mt-20 border p-4 md:p-6', toneClasses[tone], className)}
      id={id}
    >
      <div className="mb-3 flex items-center gap-3">
        <h2
          className={cn(
            'text-heading flex min-w-0 flex-1 items-center gap-2 font-bold',
            toneTitleClasses[tone],
          )}
        >
          {Icon && <Icon aria-hidden className="size-5 shrink-0" />}
          {title}
        </h2>
        {action}
      </div>
      <div className="text-body text-copy-lg flex flex-col gap-3">{children}</div>
    </section>
  )
}

export default ContentCard
