type FormSectionProps = {
  children: React.ReactNode
  title: string
}

const FormSection = ({ children, title }: FormSectionProps) => (
  <div className="flex flex-col gap-4">
    <h3 className="border-b border-gray-200 pb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
      {title}
    </h3>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
)

export default FormSection
