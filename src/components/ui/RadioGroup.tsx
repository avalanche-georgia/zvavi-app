import { Radio, RadioGroup as HeadlessUIRadioGroup } from '@headlessui/react'

import type { Option } from './types'

import { cn } from '@/lib/utils'

type RadioGroupProps = {
  name?: string
  onChange: (value: string | number, name?: string) => void
  // Overrides the default flexible-width option sizing — e.g. a fixed square
  // for a short numeric picker, where the default padding would otherwise
  // work fine but callers with longer labels (date filters, etc.) must not
  // be forced into it.
  optionClassName?: string
  options: Option[]
  value: string | number
}

const RadioGroup = ({ name, onChange, optionClassName, options, value }: RadioGroupProps) => {
  const handleChange = (selectedValue: string | number) => {
    onChange(selectedValue, name)
  }

  return (
    <HeadlessUIRadioGroup
      className="flex w-fit items-center self-start rounded bg-gray-100 p-1 text-sm dark:bg-white/5"
      name={name}
      onChange={handleChange}
      value={value}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          className={cn(
            'flex min-w-8 cursor-pointer items-center justify-center px-2 py-1 data-checked:bg-white/90 sm:px-3 sm:py-2',
            'data-checked:text-primary rounded transition-colors',
            optionClassName,
          )}
          value={option.value}
        >
          {option.label}
        </Radio>
      ))}
    </HeadlessUIRadioGroup>
  )
}

export default RadioGroup
