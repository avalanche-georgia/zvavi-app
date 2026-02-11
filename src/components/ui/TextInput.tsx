/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@headlessui/react'
import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Input
    {...props}
    className={clsx(
      'h-8 rounded border border-transparent bg-gray-100 px-3 text-sm dark:bg-white/5',
      'transition-colors focus:outline-none',
      props.readOnly
        ? 'cursor-default'
        : [
            'data-[focus]:border-primary [&[data-hover]:not([data-focus])]:border-primary/50',
            'dark:data-[focus]:bg-white/[0.08] dark:[&[data-hover]:not([data-focus])]:bg-white/[0.08]',
          ],
      props.className,
    )}
  />
)

export default TextInput
