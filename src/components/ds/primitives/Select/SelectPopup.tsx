import { Select as BaseSelect } from '@base-ui/react/select'
import { Check } from 'lucide-react'

import type { SelectOption } from './Select'
import { itemSizeClasses, type SelectSize } from './selectClasses'

import { cn } from '@/lib/utils'

type SelectPopupProps = {
  options: SelectOption<string>[]
  size: SelectSize
}

// The option list under a Select trigger
const SelectPopup = ({ options, size }: SelectPopupProps) => (
  <BaseSelect.Portal>
    <BaseSelect.Positioner
      alignItemWithTrigger={false}
      className="z-50"
      collisionPadding={16}
      sideOffset={6}
    >
      <BaseSelect.Popup className="rounded-media border-rule bg-surface shadow-menu max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto border p-1 outline-hidden">
        {options.map((option) => (
          <BaseSelect.Item
            key={option.value}
            className={cn(
              'rounded-item text-ink data-highlighted:bg-tile flex cursor-pointer items-center justify-between gap-3 px-3 outline-hidden select-none',
              itemSizeClasses[size],
            )}
            value={option.value}
          >
            <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
            <BaseSelect.ItemIndicator className="text-accent">
              <Check aria-hidden className="size-4" strokeWidth={2.5} />
            </BaseSelect.ItemIndicator>
          </BaseSelect.Item>
        ))}
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  </BaseSelect.Portal>
)

export default SelectPopup
