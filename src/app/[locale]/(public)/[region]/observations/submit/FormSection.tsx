type FormSectionProps = {
  children: React.ReactNode
  info?: React.ReactNode
  title: string
}

const FormSection = ({ children, info, title }: FormSectionProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-1 border-b border-gray-200 pb-2">
      <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase">{title}</h3>
      {info}
    </div>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
)

export default FormSection
