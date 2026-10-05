type MetaRowProps = {
  label: string
  note?: React.ReactNode
  value: React.ReactNode
}

const MetaRow = ({ label, note, value }: MetaRowProps) => (
  <div className="border-rule border-b-0 py-3 @min-[1180px]:border-b @min-[1180px]:last:border-b-0">
    <dt className="text-muted text-xs">{label}</dt>
    <dd className="text-copy text-ink font-semibold">
      {value}
      {note && <span className="text-caption block font-normal">{note}</span>}
    </dd>
  </div>
)

export default MetaRow
