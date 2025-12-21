/* eslint-disable react/jsx-props-no-spreading */
import { Button as HeadlessUIButton } from '@headlessui/react'
import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <HeadlessUIButton
    {...props}
    className={clsx(
      'flex h-8 items-center gap-1 rounded bg-primary px-3 text-sm text-white transition-colors',
      'focus:outline-none data-[active]:translate-y-px data-[hover]:bg-primary/90',
      'data-[disabled]:cursor-not-allowed data-[disabled]:bg-primary/60',
      'data-[focus]:outline-1 data-[focus]:outline-primary/40',
      props.className,
    )}
  >
    {props.children}
  </HeadlessUIButton>
)

export default Button
