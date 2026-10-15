type CopyFieldGroupProps = {
  children: React.ReactNode
  title?: string
}

// CopyFields as one tinted description list (an account's bank details)
const CopyFieldGroup = ({ children, title }: CopyFieldGroupProps) => (
  <div>
    {title && (
      <h3 className="text-caption text-muted tracking-eyebrow mb-1.5 font-semibold uppercase">
        {title}
      </h3>
    )}
    <dl className="rounded-media bg-canvas divide-rule flex flex-col divide-y px-3 [&>*]:py-2.5">
      {children}
    </dl>
  </div>
)

export default CopyFieldGroup
