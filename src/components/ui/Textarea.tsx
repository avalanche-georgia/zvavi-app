/* eslint-disable react/jsx-props-no-spreading */
import { Textarea as HeadlessUITextarea } from '@headlessui/react'
import clsx from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

const Textarea = ({ rows = 3, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <HeadlessUITextarea
    {...props}
    className={clsx(
      'resize-none rounded-sm border-none bg-gray-100 px-3 py-1.5 text-sm dark:bg-white/5',
      'focus:outline-hidden data-focus:outline-2 data-focus:-outline-offset-2',
      'data-focus:outline-primary/40 transition-colors',
      'data-hover:bg-black/3 dark:data-hover:bg-white/8',
      'data-focus:bg-black/3 dark:data-focus:bg-white/8',
      props.className,
    )}
    rows={rows}
  />
)

export default Textarea
