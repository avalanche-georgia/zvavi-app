/* eslint-disable react/jsx-props-no-spreading */
import { Button as HeadlessUIButton } from '@headlessui/react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export type ButtonVariant = 'outline' | 'primary' | 'secondary'

export const buttonVariantStyles: Record<ButtonVariant, string[]> = {
  outline: [
    'border border-gray-300 bg-transparent text-gray-700',
    'hover:bg-gray-50',
    'disabled:border-gray-200 disabled:text-gray-400',
    'focus:outline-gray-400',
  ],
  primary: [
    'bg-primary text-white',
    'hover:bg-primary/90',
    'disabled:bg-primary/60',
    'focus:outline-primary/40',
  ],
  secondary: [
    'bg-gray-100 text-gray-700',
    'hover:bg-gray-200',
    'disabled:bg-gray-100 disabled:text-gray-400',
    'focus:outline-gray-400',
  ],
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
  <HeadlessUIButton
    {...props}
    className={cn(
      'flex h-8 items-center gap-1 rounded-sm px-3 text-sm transition-colors',
      'focus:outline-hidden active:translate-y-px',
      'disabled:cursor-not-allowed',
      'focus:outline-1',
      buttonVariantStyles[variant],
      props.className,
    )}
  >
    {props.children}
  </HeadlessUIButton>
)

export default Button
