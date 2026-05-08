/* eslint-disable react/jsx-props-no-spreading */
import { Button as HeadlessUIButton } from '@headlessui/react'
import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'outline' | 'primary' | 'secondary'

export const buttonVariantStyles: Record<ButtonVariant, string[]> = {
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

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
  <HeadlessUIButton
    {...props}
    className={clsx(
      'flex h-8 items-center gap-1 rounded-sm px-3 text-sm transition-colors',
      'focus:outline-hidden data-active:translate-y-px',
      'data-disabled:cursor-not-allowed',
      'data-focus:outline-1',
      buttonVariantStyles[variant],
      props.className,
    )}
  >
    {props.children}
  </HeadlessUIButton>
)

export default Button
