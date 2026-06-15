/* eslint-disable react/jsx-props-no-spreading */
import { Icon } from '@components/icons'
import type { IconName } from '@components/icons/types'
import { Input } from '@headlessui/react'
import type { InputHTMLAttributes } from 'react'
import { cn } from 'src/lib/utils'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
  leftIcon?: IconName
  rightIcon?: IconName
}

const TextInput = ({ hasError, leftIcon, rightIcon, ...props }: TextInputProps) => {
  const input = (
    <Input
      {...props}
      className={cn(
        'h-8 rounded-sm border bg-gray-100 px-3 text-sm dark:bg-white/5',
        'transition-colors focus:outline-hidden',
        leftIcon && 'pl-8',
        rightIcon && 'pr-8',
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

  if (!leftIcon && !rightIcon) return input

  return (
    <div className="relative">
      {leftIcon && (
        <Icon
          containerClassName="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-gray-600"
          icon={leftIcon}
          size="sm"
        />
      )}
      {input}
      {rightIcon && (
        <Icon
          containerClassName="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-600"
          icon={rightIcon}
          size="sm"
        />
      )}
    </div>
  )
}

export default TextInput
