import { Info, OctagonAlert, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'

export type AlertTone = 'danger' | 'info' | 'warning'

type AlertProps = {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
  tone?: AlertTone
}

const toneClasses: Record<AlertTone, string> = {
  danger: 'border-danger-border bg-danger/5 text-danger',
  info: 'border-transparent bg-accent-soft text-accent-hover',
  warning: 'border-transparent bg-warning-soft text-warning',
}

const toneIcons: Record<AlertTone, React.ElementType> = {
  danger: OctagonAlert,
  info: Info,
  warning: TriangleAlert,
}

// Static note inside content: what to know or be careful about. Not announced as
// it renders — use a toast for messages that appear after an action.
const Alert = ({ children, className, title, tone = 'info' }: AlertProps) => {
  const Icon = toneIcons[tone]

  return (
    <div
      className={cn(
        'rounded-media text-copy-sm flex items-start gap-3 border px-4 py-3',
        toneClasses[tone],
        className,
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-4.5 shrink-0" />
      <div className="min-w-0">
        {title && <p className="text-copy font-semibold">{title}</p>}
        <div className={cn(title && 'mt-0.5')}>{children}</div>
      </div>
    </div>
  )
}

export default Alert
