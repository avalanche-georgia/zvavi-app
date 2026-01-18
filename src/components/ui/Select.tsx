'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { Check, ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export type SelectOption = {
  label: string
  value: string
}

export const toOptions = (
  keys: readonly string[] | Record<string, string>,
  t: (key: string) => string,
): SelectOption[] => {
  const entries = Array.isArray(keys) ? keys : Object.keys(keys)

  return entries.map((key) => ({ label: t(key), value: key }))
}

type SelectProps = {
  className?: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  value: string
}

const Select = ({ className, onChange, options, placeholder, value }: SelectProps) => (
  <SelectPrimitive.Root onValueChange={onChange} value={value}>
    <SelectPrimitive.Trigger
      className={twMerge(
        clsx(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white',
          'px-3 py-2 text-sm ring-offset-white',
          'placeholder:text-gray-500',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          '[&>span]:line-clamp-1',
          className,
        ),
      )}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>

    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={clsx(
          'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-white shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
        )}
        position="popper"
      >
        <SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] p-1">
          {options.map((option) => (
            <SelectPrimitive.Item
              key={option.value}
              className={clsx(
                'relative flex w-full cursor-default select-none items-center rounded-sm',
                'py-1.5 pl-8 pr-2 text-sm outline-none',
                'focus:bg-gray-100 focus:text-gray-900',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              )}
              value={option.value}
            >
              <span className="absolute left-2 flex size-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                  <Check className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </span>
              <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
)

export default Select
