import { fontSizeClasses, trackingClasses } from './constants'

import { fontSizeTokens, trackingTokens } from '@/lib/designTokens'
import { cn } from '@/lib/utils'

const TypeScaleTokens = () => (
  <div className="divide-rule flex flex-col divide-y">
    {fontSizeTokens.map((token) => (
      <div key={token} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
        <code className="text-caption text-muted w-28 shrink-0">text-{token}</code>
        <p className={cn('text-ink', fontSizeClasses[token])}>
          Avalanche observed on a north-east slope
        </p>
      </div>
    ))}
    {trackingTokens.map((token) => (
      <div key={token} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
        <code className="text-caption text-muted w-28 shrink-0">tracking-{token}</code>
        <p className={cn('text-caption text-ink font-semibold uppercase', trackingClasses[token])}>
          Overall danger level
        </p>
      </div>
    ))}
  </div>
)

export default TypeScaleTokens
