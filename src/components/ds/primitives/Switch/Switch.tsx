'use client'

import { Switch as BaseSwitch } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

type SwitchProps = {
  checked: boolean
  className?: string
  // Names the "on" state, e.g. "Unlinked" for a filter that shows unlinked records only
  label: React.ReactNode
  // Next to the label but outside the <label>, e.g. an InfoTip — so tapping it
  // doesn't flip the switch
  labelAside?: React.ReactNode
  onCheckedChange: (checked: boolean) => void
}

// On / off that takes effect right away (a toolbar filter, a setting). Use a
// Checkbox for choices that are submitted with a form.
const Switch = ({ checked, className, label, labelAside, onCheckedChange }: SwitchProps) => (
  <div className={cn('flex items-center gap-1.5', className)}>
    {/* Hugs track + text for a mouse; grows to a 44px row on touch screens */}
    <label className="flex cursor-pointer items-center gap-2.5 py-0.5 pointer-coarse:min-h-11">
      <BaseSwitch.Root
        checked={checked}
        className={cn(
          'focus-ring bg-off relative flex h-5.5 w-9.5 shrink-0 rounded-full p-0.5 transition-colors',
          'hover:bg-rule-strong data-checked:bg-accent data-checked:hover:bg-accent-hover',
        )}
        onCheckedChange={onCheckedChange}
      >
        <BaseSwitch.Thumb className="bg-surface shadow-overlay size-4.5 rounded-full transition-transform data-checked:translate-x-4" />
      </BaseSwitch.Root>
      <span className="text-copy text-ink font-medium">{label}</span>
    </label>
    {labelAside}
  </div>
)

export default Switch
