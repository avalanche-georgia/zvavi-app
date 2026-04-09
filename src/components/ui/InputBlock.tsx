import type { ReactNode } from 'react'

import InfoIcon from './InfoIcon'

type InputBlockProps = {
  children: ReactNode
  error?: string
  hint?: string
  label: string
  required?: boolean
}

const InputBlock = ({ children, error, hint, label, required }: InputBlockProps) => (
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
      {hint && <InfoIcon content={hint} />}
    </span>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
)

export default InputBlock
