type GroupHeaderProps = {
  count?: number
  label: string
}

const GroupHeader = ({ count, label }: GroupHeaderProps) => (
  <h2 className="text-muted mx-0.5 mt-4.5 mb-2 flex justify-between text-xs font-semibold tracking-[.06em] uppercase">
    <span>{label}</span>
    {count !== undefined && <span>{count}</span>}
  </h2>
)

export default GroupHeader
