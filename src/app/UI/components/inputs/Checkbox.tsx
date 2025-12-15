import { Checkbox as HeadlessUICheckbox, Field, Label } from '@headlessui/react'
import clsx from 'clsx'

import { Icon } from '@/UI/components'

type LabelPosition = 'left' | 'right'

type CheckboxProps = {
  className?: string
  isChecked: boolean
  label?: string
  labelPosition?: LabelPosition
  onChange: (checked: boolean) => void
}

const Checkbox = ({
  className,
  isChecked,
  label,
  labelPosition = 'right',
  onChange,
}: CheckboxProps) => (
  <Field className="flex flex-none items-center gap-2">
    {label && labelPosition === 'left' && <Label className="cursor-pointer">{label}</Label>}

    <HeadlessUICheckbox
      checked={isChecked}
      className={clsx(
        'group flex size-5 cursor-pointer items-center justify-center rounded-md p-0.5 ring-1',
        'ring-inset ring-white/15 data-[hover]:ring-primary',
        'transition-[background-color,box-shadow] data-[checked]:bg-primary',
        { 'bg-white': !className?.includes('bg-') },
        className,
      )}
      onChange={onChange}
    >
      <Icon className="hidden stroke-white group-data-[checked]:block" icon="check" size="sm" />
    </HeadlessUICheckbox>

    {label && labelPosition === 'right' && <Label className="cursor-pointer">{label}</Label>}
  </Field>
)

export default Checkbox
