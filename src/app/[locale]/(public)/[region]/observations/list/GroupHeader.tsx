type GroupHeaderProps = {
  count?: number
  label: string
}

const GroupHeader = ({ count, label }: GroupHeaderProps) => (
  <h2 className="text-muted text-caption tracking-eyebrow mx-0.5 mt-4.5 mb-2 flex justify-between font-semibold uppercase">
    <span>{label}</span>
    {count !== undefined && <span>{count}</span>}
  </h2>
)

export default GroupHeader
