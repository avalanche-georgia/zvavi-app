/* eslint-disable react/jsx-props-no-spreading */
import { Button as HeadlessUIButton } from '@headlessui/react'
import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const variantStyles = {
  primary: [
    'bg-primary text-white',
    'data-[hover]:bg-primary/90',
    'data-[disabled]:bg-primary/60',
    'data-[focus]:outline-primary/40',
  ],
  secondary: [
    'bg-gray-100 text-gray-700',
    'data-[hover]:bg-gray-200',
    'data-[disabled]:bg-gray-100 data-[disabled]:text-gray-400',
    'data-[focus]:outline-gray-400',
  ],
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
  <HeadlessUIButton
    {...props}
    className={clsx(
      'flex h-8 items-center gap-1 rounded px-3 text-sm transition-colors',
      'focus:outline-none data-[active]:translate-y-px',
      'data-[disabled]:cursor-not-allowed',
      'data-[focus]:outline-1',
      variantStyles[variant],
      props.className,
    )}
  >
    {props.children}
  </HeadlessUIButton>
)

export default Button
