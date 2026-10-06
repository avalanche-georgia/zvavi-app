import { LoadError } from '@components/shared'

// The list failed to load — must not read as "no forecasts yet"
const ListLoadError = ({ onRetry }: { onRetry: VoidFunction }) => (
  <div className="rounded-card border-rule bg-surface border">
    <LoadError onRetry={onRetry} />
  </div>
)

export default ListLoadError
