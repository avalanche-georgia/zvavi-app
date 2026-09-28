type InfoRowProps = {
  label: string
  value: string
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex min-w-0 flex-col gap-0.5">
    <span className="text-caption text-muted font-medium">{label}</span>
    <span className="text-copy text-ink break-words">{value}</span>
  </div>
)

export default InfoRow
