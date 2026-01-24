import clsx from 'clsx'

type InputBlockProps = {
  children: React.ReactNode
  className?: string
  error?: string
  label: string
  labelClassName?: string
  required?: boolean
}

const InputBlock = ({
  children,
  className,
  error,
  label,
  labelClassName = 'w-28',
  required,
}: InputBlockProps) => (
  <div className={clsx('flex flex-col gap-1', className)}>
    <div className="flex items-center gap-3">
      <h4 className={clsx('flex-none font-semibold', labelClassName)}>
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </h4>
      {children}
    </div>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
)

export default InputBlock
