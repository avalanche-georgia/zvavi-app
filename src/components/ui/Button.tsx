/* eslint-disable react/jsx-props-no-spreading */
import { Button as HeadlessUIButton } from '@headlessui/react'
import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'outline' | 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantStyles = {
  outline: [
    'border border-gray-300 bg-transparent text-gray-700',
    'data-hover:bg-gray-50',
    'data-disabled:border-gray-200 data-disabled:text-gray-400',
    'data-focus:outline-gray-400',
  ],
  primary: [
    'bg-primary text-white',
    'data-hover:bg-primary/90',
    'data-disabled:bg-primary/60',
    'data-focus:outline-primary/40',
  ],
  secondary: [
    'bg-gray-100 text-gray-700',
    'data-hover:bg-gray-200',
    'data-disabled:bg-gray-100 data-disabled:text-gray-400',
    'data-focus:outline-gray-400',
  ],
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
  <HeadlessUIButton
    {...props}
    className={clsx(
      'flex h-8 items-center gap-1 rounded-sm px-3 text-sm transition-colors',
      'focus:outline-hidden data-active:translate-y-px',
      'data-disabled:cursor-not-allowed',
      'data-focus:outline-1',
      variantStyles[variant],
      props.className,
    )}
  >
    {props.children}
  </HeadlessUIButton>
)

export default Button
