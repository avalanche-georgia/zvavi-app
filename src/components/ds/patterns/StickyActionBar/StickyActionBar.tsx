import { cn } from '@/lib/utils'

type StickyActionBarProps = {
  action: React.ReactNode
  className?: string
  status?: React.ReactNode
}

// Pinned to the bottom of the viewport while its container scrolls: a full-bleed
// frosted bar on phones, a floating card from `md` up. z-35 keeps it above maps
// (z-30) and below the site header (z-40), toasts and dialogs.
const StickyActionBar = ({ action, className, status }: StickyActionBarProps) => (
  <div
    className={cn(
      'border-rule bg-canvas/95 sticky bottom-0 z-35 flex items-center gap-2.5 border-t px-4 pt-3 backdrop-blur-md',
      'pb-[calc(0.75rem+env(safe-area-inset-bottom))]',
      'md:rounded-card md:bg-surface/95 md:shadow-float md:bottom-4 md:border md:pb-3',
      className,
    )}
  >
    <div aria-live="polite" className="text-copy-sm text-muted min-w-0 flex-1 leading-snug">
      {status}
    </div>
    {action}
  </div>
)

export default StickyActionBar
