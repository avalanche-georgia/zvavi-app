import { Radio, RadioGroup as HeadlessUIRadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import type { Option } from './types'

type RadioGroupProps = {
  name?: string
  onChange: (value: string | number, name?: string) => void
  options: Option[]
  value: string | number
}

const RadioGroup = ({ name, onChange, options, value }: RadioGroupProps) => {
  const handleChange = (selectedValue: string | number) => {
    onChange(selectedValue, name)
  }

  return (
    <HeadlessUIRadioGroup
      className={clsx('flex items-center rounded bg-gray-100 p-1 text-sm dark:bg-white/5')}
      name={name}
      onChange={handleChange}
      value={value}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          className={clsx(
            'flex min-w-8 cursor-pointer items-center justify-center px-2 py-1 data-[checked]:bg-white/90',
            'rounded transition-colors data-[checked]:text-primary',
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
