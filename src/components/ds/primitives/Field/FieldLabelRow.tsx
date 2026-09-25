type FieldLabelRowProps = {
  children: React.ReactNode
  hint?: React.ReactNode
}

// Label on the left, optional muted hint ("Optional", "Rough estimates are fine") on the right
const FieldLabelRow = ({ children, hint }: FieldLabelRowProps) => (
  <div className="flex items-baseline justify-between gap-2">
    {children}
    {hint && <span className="text-caption text-muted text-right">{hint}</span>}
  </div>
)

export default FieldLabelRow
