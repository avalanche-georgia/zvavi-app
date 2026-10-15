import { Dialog } from '@base-ui/react/dialog'

import SheetCloseButton from './SheetCloseButton'

import { cn } from '@/lib/utils'

type SheetHeaderProps = {
  // Controls after the title: step arrows, a link to the full page
  children?: React.ReactNode
  closeLabel: string
  // Screen readers still get the title; the row shows the subtitle instead
  // (e.g. a sheet stepping through a list shows "2 of 5")
  isTitleHidden?: boolean
  // Between the close button and the title, e.g. a number badge
  leading?: React.ReactNode
  subtitle?: React.ReactNode
  title: React.ReactNode
}

// Standard header row of a Sheet: × · title (+ subtitle) · trailing controls
const SheetHeader = ({
  children,
  closeLabel,
  isTitleHidden = false,
  leading,
  subtitle,
  title,
}: SheetHeaderProps) => (
  <>
    <SheetCloseButton label={closeLabel} />
    {leading}
    <div className="flex min-w-0 flex-1 flex-col">
      <Dialog.Title
        className={cn('text-copy-lg m-0 truncate font-semibold', isTitleHidden && 'sr-only')}
      >
        {title}
      </Dialog.Title>
      {subtitle && <span className="text-copy-sm text-muted truncate">{subtitle}</span>}
    </div>
    {children}
  </>
)

export default SheetHeader
