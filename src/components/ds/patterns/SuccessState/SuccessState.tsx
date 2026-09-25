import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

type SuccessStateProps = {
  actions?: React.ReactNode
  className?: string
  description?: React.ReactNode
  title: React.ReactNode
}

// Confirmation that replaces a finished flow (e.g. a submitted form)
const SuccessState = ({ actions, className, description, title }: SuccessStateProps) => (
  <div
    className={cn(
      'rounded-card border-rule bg-surface flex flex-col items-center gap-3 border px-6 py-10 text-center',
      className,
    )}
    role="status"
  >
    <span className="bg-success-soft text-success mb-1 flex size-16 items-center justify-center rounded-full">
      <Check aria-hidden className="size-8" strokeWidth={2.5} />
    </span>
    <h2 className="text-title text-ink font-bold">{title}</h2>
    {description && <p className="text-copy text-body max-w-md text-pretty">{description}</p>}
    {actions && <div className="mt-3 flex flex-wrap justify-center gap-2.5">{actions}</div>}
  </div>
)

export default SuccessState
