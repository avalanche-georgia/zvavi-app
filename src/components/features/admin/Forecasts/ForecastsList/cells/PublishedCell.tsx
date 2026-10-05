import { useListDates } from '../../shared'

const PublishedCell = ({ publishedAt }: { publishedAt: string | null }) => {
  const { formatDate, formatTime } = useListDates()

  if (!publishedAt) return <span className="text-placeholder">—</span>

  return (
    <div className="flex flex-col tabular-nums">
      <span className="font-medium">{formatDate(publishedAt)}</span>
      <span className="text-caption text-muted">{formatTime(publishedAt)}</span>
    </div>
  )
}

export default PublishedCell
