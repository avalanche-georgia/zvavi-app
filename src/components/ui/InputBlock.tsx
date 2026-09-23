import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import InfoIcon from './InfoIcon'

import { cn } from '@/lib/utils'

type BaseProps = {
  children: ReactNode
  className?: string
  error?: string
  hint?: string
  label: string
}

// A field can't be both — passing both is a type error, not just untested.
type InputBlockProps = BaseProps &
  ({ optional?: boolean; required?: never } | { optional?: never; required?: boolean })

const InputBlock = ({
  children,
  className,
  error,
  hint,
  label,
  optional,
  required,
}: InputBlockProps) => {
  const t = useTranslations()

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {optional && (
          <span className="text-xs font-normal text-gray-400">({t('common.words.optional')})</span>
        )}
        {hint && <InfoIcon content={hint} />}
      </span>
      {children}
      {error && (
        <span className="text-xs text-red-500" data-field-error>
          {error}
        </span>
      )}
    </div>
  )
}

export default InputBlock
