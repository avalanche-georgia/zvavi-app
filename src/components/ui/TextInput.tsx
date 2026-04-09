/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@headlessui/react'
import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }

const TextInput = ({ hasError, ...props }: TextInputProps) => (
  <Input
    {...props}
    className={clsx(
      'h-8 rounded-sm border bg-gray-100 px-3 text-sm dark:bg-white/5',
      'transition-colors focus:outline-hidden',
      hasError
        ? 'border-red-500'
        : props.readOnly
          ? 'cursor-default border-transparent'
          : [
              'border-transparent',
              'data-focus:border-primary [&[data-hover]:not([data-focus])]:border-primary/50',
              'dark:data-focus:bg-white/8 dark:[&[data-hover]:not([data-focus])]:bg-white/8',
            ],
      props.className,
    )}
  />
)

export default TextInput
