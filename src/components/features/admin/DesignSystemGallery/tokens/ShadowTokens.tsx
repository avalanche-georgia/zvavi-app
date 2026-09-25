import { shadowClasses } from './constants'

import { shadowTokens } from '@/lib/designTokens'
import { cn } from '@/lib/utils'

const ShadowTokens = () => (
  <div className="flex flex-wrap gap-6">
    {shadowTokens.map((token) => (
      <div key={token} className="flex flex-col items-center gap-2">
        <span className={cn('bg-surface rounded-control size-20', shadowClasses[token])} />
        <code className="text-caption text-muted">shadow-{token}</code>
      </div>
    ))}
  </div>
)

export default ShadowTokens
