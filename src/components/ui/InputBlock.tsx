import type { ReactNode } from 'react'

type InputBlockProps = {
  children: ReactNode
  error?: string
  label: string
  required?: boolean
}

const InputBlock = ({ children, error, label, required }: InputBlockProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </span>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
)

export default InputBlock
