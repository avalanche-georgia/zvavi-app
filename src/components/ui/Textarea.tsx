/* eslint-disable react/jsx-props-no-spreading */
import { Textarea as HeadlessUITextarea } from '@headlessui/react'
import clsx from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

const Textarea = ({ rows = 3, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <HeadlessUITextarea
    {...props}
    className={clsx(
      'resize-none rounded border-none bg-gray-100 px-3 py-1.5 text-sm dark:bg-white/5',
      'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2',
      'transition-colors  data-[focus]:outline-primary/40',
      'data-[hover]:bg-black/[0.03] dark:data-[hover]:bg-white/[0.08]',
      'data-[focus]:bg-black/[0.03] dark:data-[focus]:bg-white/[0.08]',
      props.className,
    )}
    rows={rows}
  />
)

export default Textarea
