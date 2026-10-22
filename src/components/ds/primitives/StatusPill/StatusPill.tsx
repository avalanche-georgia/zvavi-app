import { cn } from '@/lib/utils'

export type StatusPillTone = 'accent' | 'danger' | 'neutral' | 'success' | 'warning'

type StatusPillProps = {
  children: React.ReactNode
  className?: string
  tone?: StatusPillTone
  // A live dot before the label, for the state that is on air right now
  withDot?: boolean
}

const toneClasses: Record<StatusPillTone, string> = {
  accent: 'bg-accent-soft text-accent',
  danger: 'bg-danger/10 text-danger',
  neutral: 'bg-tile text-muted',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
}

const dotClasses: Record<StatusPillTone, string> = {
  accent: 'bg-accent ring-accent/20',
  danger: 'bg-danger ring-danger/20',
  neutral: 'bg-muted ring-muted/20',
  success: 'bg-success ring-success/20',
  warning: 'bg-warning ring-warning/20',
}

// The state of a record (Published, Draft, Pending…). The tone carries the meaning,
// the label names it — never colour alone.
const StatusPill = ({
  children,
  className,
  tone = 'neutral',
  withDot = false,
}: StatusPillProps) => (
  <span
    className={cn(
      'text-caption rounded-badge inline-flex items-center gap-1.5 px-2 py-0.75 font-semibold whitespace-nowrap',
      toneClasses[tone],
      className,
    )}
  >
    {withDot && (
      <span aria-hidden className={cn('size-1.5 rounded-full ring-3', dotClasses[tone])} />
    )}
    {children}
  </span>
)

export default StatusPill
