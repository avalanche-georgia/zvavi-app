/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@headlessui/react'
import clsx from 'clsx'
import type { InputHTMLAttributes } from 'react'

const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Input
    {...props}
    className={clsx(
      'rounded border-none bg-gray-100 px-3 py-1.5 text-sm dark:bg-white/5',
      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2',
      'transition-colors data-[focus]:outline-primary/40',
      'data-[hover]:bg-black/[0.03] dark:data-[hover]:bg-white/[0.08]',
      'data-[focus]:bg-black/[0.03] dark:data-[focus]:bg-white/[0.08]',
      props.className,
    )}
  />
)

export default TextInput
