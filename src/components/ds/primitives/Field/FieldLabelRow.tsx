type FieldLabelRowProps = {
  children: React.ReactNode
  hint?: React.ReactNode
  // Lets the control reference the hint via aria-describedby
  hintId?: string
}

// Label on the left, optional muted hint ("Optional", "Rough estimates are fine") on the right
const FieldLabelRow = ({ children, hint, hintId }: FieldLabelRowProps) => (
  <div className="flex items-baseline justify-between gap-2">
    {children}
    {hint && (
      <span className="text-caption text-muted text-right" id={hintId}>
        {hint}
      </span>
    )}
  </div>
)

export default FieldLabelRow
