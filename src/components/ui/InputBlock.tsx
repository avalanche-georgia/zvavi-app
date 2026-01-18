import type { ReactNode } from 'react'

type InputBlockProps = {
  children: ReactNode
  label: string
}

const InputBlock = ({ children, label }: InputBlockProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    {children}
  </div>
)

export default InputBlock
