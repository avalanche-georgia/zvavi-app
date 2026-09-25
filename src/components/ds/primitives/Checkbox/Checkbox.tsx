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
  onCheckedChange: (checked: boolean) => void
}

// The <label> wraps box + text, so the whole row (min 44px tall) toggles it
const Checkbox = ({ checked, className, description, label, onCheckedChange }: CheckboxProps) => {
  const descriptionId = useId()

  return (
    <div className={cn('grid grid-cols-[auto_1fr] gap-x-3', className)}>
      <label className="col-span-2 grid min-h-11 cursor-pointer grid-cols-subgrid items-center">
        <BaseCheckbox.Root
          aria-describedby={description ? descriptionId : undefined}
          checked={checked}
          className={cn(
            'focus-ring rounded-badge border-rule-strong bg-surface flex size-5 items-center justify-center border transition-colors',
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
      {description && (
        <p className="text-copy-sm text-muted col-start-2 text-pretty" id={descriptionId}>
          {description}
        </p>
      )}
    </div>
  )
}

export default Checkbox
