type BankAccountGroupProps = {
  children: React.ReactNode
  title: string
}

// One currency's details, as a tinted block of copyable rows
const BankAccountGroup = ({ children, title }: BankAccountGroupProps) => (
  <div>
    <h3 className="text-caption text-muted tracking-eyebrow mb-1.5 font-semibold uppercase">
      {title}
    </h3>
    <dl className="rounded-media bg-canvas divide-rule flex flex-col divide-y px-3 [&>*]:py-2.5">
      {children}
    </dl>
  </div>
)

export default BankAccountGroup
