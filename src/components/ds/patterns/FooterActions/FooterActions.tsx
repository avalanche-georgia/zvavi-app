import { cn } from '@/lib/utils'

type FooterActionsProps = {
  // The buttons, dismiss first: [Cancel] [Primary]
  children: React.ReactNode
  className?: string
  // A hint on the left
  note?: React.ReactNode
}

// Sheet / panel footer row. Buttons always sit on the right; when the footer is
// narrow the note takes its own line above them.
const FooterActions = ({ children, className, note }: FooterActionsProps) => (
  <div className={cn('@container w-full', className)}>
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
      {note && (
        <div className="text-caption text-muted mr-auto @max-[520px]:basis-full">{note}</div>
      )}
      <div className="ml-auto flex shrink-0 gap-2">{children}</div>
    </div>
  </div>
)

export default FooterActions
