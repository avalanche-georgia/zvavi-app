import { radiusClasses } from './constants'

import { radiusTokens } from '@/lib/designTokens'
import { cn } from '@/lib/utils'

const RadiusTokens = () => (
  <div className="flex flex-wrap gap-4">
    {radiusTokens.map((token) => (
      <div key={token} className="flex flex-col items-center gap-2">
        <span className={cn('bg-tile border-rule-strong size-20 border', radiusClasses[token])} />
        <code className="text-caption text-muted">rounded-{token}</code>
      </div>
    ))}
  </div>
)

export default RadiusTokens
