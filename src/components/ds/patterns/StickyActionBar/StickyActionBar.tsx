import { cn } from '@/lib/utils'

type StickyActionBarProps = {
  action: React.ReactNode
  // Screen-reader-only live message for events worth announcing (e.g. "Will send
  // once photos finish uploading"). The visible status isn't live — it changes
  // on almost every keystroke and would be re-read each time.
  announcement?: string
  className?: string
  status?: React.ReactNode
}

// Pinned to the bottom of the viewport while its container scrolls: a full-bleed
// frosted bar on phones, a floating card from `md` up. z-35 keeps it above maps
// (z-30) and below the site header (z-40), toasts and dialogs.
const StickyActionBar = ({ action, announcement, className, status }: StickyActionBarProps) => (
  <div
    className={cn(
      'border-rule bg-canvas/95 sticky bottom-0 z-35 flex items-center gap-2.5 border-t px-4 pt-3 backdrop-blur-md',
      'pb-[calc(0.75rem+env(safe-area-inset-bottom))]',
      'md:rounded-card md:bg-surface/95 md:shadow-float md:bottom-4 md:border md:pb-3',
      className,
    )}
  >
    <div className="text-copy-sm text-muted min-w-0 flex-1 leading-snug">{status}</div>
    <span aria-live="polite" className="sr-only">
      {announcement}
    </span>
    {action}
  </div>
)

export default StickyActionBar
