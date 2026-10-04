import { cn } from '@/lib/utils'

type FooterActionsProps = {
  // The buttons, dismiss first: [Cancel] [Primary]
  children: React.ReactNode
  className?: string
  // A question the buttons answer (e.g. "Discard unsaved changes?"): announced,
  // and slides in slightly
  isConfirmation?: boolean
  // Text on the left: a hint, or the confirmation question
  note?: React.ReactNode
}

// Sheet / panel footer row. Buttons always sit on the right; when the footer is
// narrow the note takes its own line above them.
const FooterActions = ({ children, className, isConfirmation, note }: FooterActionsProps) => (
  <div
    className={cn(
      '@container w-full',
      isConfirmation &&
        'transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none starting:-translate-y-1 starting:opacity-0',
      className,
    )}
    role={isConfirmation ? 'alert' : undefined}
  >
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
      {note && (
        <div
          className={cn(
            'mr-auto @max-[520px]:basis-full',
            isConfirmation ? 'text-copy-sm text-ink font-semibold' : 'text-caption text-muted',
          )}
        >
          {note}
        </div>
      )}
      <div className="ml-auto flex shrink-0 gap-2">{children}</div>
    </div>
  </div>
)

export default FooterActions
