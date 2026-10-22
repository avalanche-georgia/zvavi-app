'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'

import { IconButton } from '../IconButton'

type DialogHeaderProps = {
  // No × when left out (a dialog with isCloseDisabled)
  closeLabel?: string
  icon?: React.ReactNode
  isBusy: boolean
  title: string
}

// Leading icon, title and ×; on phones a grab bar above, like a bottom sheet
const DialogHeader = ({ closeLabel, icon, isBusy, title }: DialogHeaderProps) => (
  <>
    <span
      aria-hidden
      className="bg-rule-strong mx-auto mt-2 h-1 w-9 shrink-0 rounded-full sm:hidden"
    />
    <div className="flex shrink-0 items-center gap-3 py-4.5 pr-4 pl-4 sm:pl-6">
      {icon}
      <BaseDialog.Title className="text-heading min-w-0 flex-1 font-semibold text-pretty">
        {title}
      </BaseDialog.Title>
      {closeLabel && (
        <BaseDialog.Close
          disabled={isBusy}
          render={<IconButton aria-label={closeLabel} size="md" />}
        >
          <X aria-hidden className="size-4.5" />
        </BaseDialog.Close>
      )}
    </div>
  </>
)

export default DialogHeader
