'use client'

import { useId } from 'react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

type CheckboxProps = {
  checked: boolean
  className?: string
  // Longer explanation under the label, announced as the checkbox's description
  description?: React.ReactNode
  label: React.ReactNode
  // Next to the label but outside the <label>, e.g. an InfoTip — so tapping it
  // doesn't toggle the checkbox
  labelAside?: React.ReactNode
  onCheckedChange: (checked: boolean) => void
}

// The <label> wraps box + text, so clicking either toggles it
const Checkbox = ({
  checked,
  className,
  description,
  label,
  labelAside,
  onCheckedChange,
}: CheckboxProps) => {
  const descriptionId = useId()

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-2">
        {/* Hugs box + text for a mouse; grows to a 44px row on touch screens */}
        <label className="flex cursor-pointer items-center gap-3 py-0.5 pointer-coarse:min-h-11">
          <BaseCheckbox.Root
            aria-describedby={description ? descriptionId : undefined}
            checked={checked}
            className={cn(
              'focus-ring rounded-badge border-rule-strong bg-surface flex size-5 shrink-0 items-center justify-center border transition-colors',
              'hover:border-muted data-checked:border-accent data-checked:bg-accent',
            )}
            onCheckedChange={onCheckedChange}
          >
            <BaseCheckbox.Indicator className="text-white">
              <Check aria-hidden className="size-3.5" strokeWidth={3} />
            </BaseCheckbox.Indicator>
          </BaseCheckbox.Root>
          <span className="text-copy text-ink font-medium">{label}</span>
        </label>
        {labelAside}
      </div>
      {description && (
        // Indented to line up with the label text (box 20px + gap 12px)
        <p className="text-copy-sm text-muted pl-8 text-pretty" id={descriptionId}>
          {description}
        </p>
      )}
    </div>
  )
}

export default Checkbox
