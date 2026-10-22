'use client'

import { useId } from 'react'
import { Switch as BaseSwitch } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

type SwitchProps = {
  checked: boolean
  className?: string
  // Longer explanation under the label, announced as the switch's description
  description?: React.ReactNode
  // Locked while its change is being saved: like read-only, with a progress cursor
  isBusy?: boolean
  // Screen readers only — for a column of switches whose header already names them
  isLabelHidden?: boolean
  // Shown dimmed and ignores clicks but keeps keyboard focus
  isReadOnly?: boolean
  // Names the "on" state, e.g. "Unlinked" for a filter that shows unlinked records only
  label: React.ReactNode
  // Next to the label but outside the <label>, e.g. an InfoTip — so tapping it
  // doesn't flip the switch
  labelAside?: React.ReactNode
  onCheckedChange: (checked: boolean) => void
}

// On / off: a setting that takes effect right away (a toolbar filter, a row's
// Active), or the same setting inside that record's form
const Switch = ({
  checked,
  className,
  description,
  isBusy = false,
  isLabelHidden = false,
  isReadOnly = false,
  label,
  labelAside,
  onCheckedChange,
}: SwitchProps) => {
  const descriptionId = `${useId()}-description`
  const isLocked = isBusy || isReadOnly

  // base-ui's readOnly only stops clicks on the track; the wrapping <label> still
  // activates its hidden input and reports a change
  const handleCheckedChange = (nextChecked: boolean) => {
    if (isLocked) return

    onCheckedChange(nextChecked)
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-1.5">
        {/* Hugs track + text for a mouse; grows to a 44px row on touch screens */}
        <label
          className={cn(
            'flex items-center gap-2.5 py-0.5 pointer-coarse:min-h-11',
            isLocked ? 'opacity-50' : 'cursor-pointer',
            isBusy ? 'cursor-progress' : isReadOnly && 'cursor-not-allowed',
          )}
        >
          <BaseSwitch.Root
            aria-busy={isBusy || undefined}
            aria-describedby={description ? descriptionId : undefined}
            checked={checked}
            className={cn(
              // Off: outlined track + dark thumb, so the state reads on any surface
              'focus-ring border-muted bg-tile relative flex h-5.5 w-9.5 shrink-0 rounded-full border p-0.5 transition-colors',
              'data-checked:border-accent data-checked:bg-accent',
              !isLocked &&
                'hover:bg-tile-hover data-checked:hover:border-accent-hover data-checked:hover:bg-accent-hover',
            )}
            onCheckedChange={handleCheckedChange}
            readOnly={isLocked}
          >
            <BaseSwitch.Thumb className="bg-muted data-checked:bg-surface size-4 rounded-full transition-[translate,background-color] data-checked:translate-x-4" />
          </BaseSwitch.Root>
          <span className={cn('text-copy text-ink font-medium', isLabelHidden && 'sr-only')}>
            {label}
          </span>
        </label>
        {labelAside}
      </div>
      {description && (
        // Indented to line up with the label text (track 38px + gap 10px)
        <p className="text-copy-sm text-muted pl-12 text-pretty" id={descriptionId}>
          {description}
        </p>
      )}
    </div>
  )
}

export default Switch
