import { cn } from '@/lib/utils'

type ContentCardProps = {
  // Right of the title, e.g. a small link
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
  // Anchor target for in-page links (#id)
  id?: string
  title: React.ReactNode
}

// A section of a reading page: white card, H2 title, content below
const ContentCard = ({ action, children, className, id, title }: ContentCardProps) => (
  <section
    className={cn('rounded-card border-rule bg-surface scroll-mt-20 border p-4 md:p-6', className)}
    id={id}
  >
    <div className="mb-3 flex items-baseline gap-3">
      <h2 className="text-heading min-w-0 flex-1 font-bold">{title}</h2>
      {action}
    </div>
    <div className="text-body text-copy-lg flex flex-col gap-3">{children}</div>
  </section>
)

export default ContentCard
