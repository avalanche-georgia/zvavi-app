type InfoRowProps = {
  label: string
  value: string
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-medium text-gray-500">{label}</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
)

export default InfoRow
