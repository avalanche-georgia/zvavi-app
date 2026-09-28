'use client'

import { colorSwatchClasses } from './constants'

import { useCssVariable } from '../useCssVariable'

import { cn } from '@/lib/utils'

const ColorSwatch = ({ name }: { name: string }) => {
  const value = useCssVariable(`--color-${name}`)

  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          'border-rule rounded-control size-10 shrink-0 border',
          colorSwatchClasses[name],
        )}
      />
      <div className="flex min-w-0 flex-col">
        <code className="text-copy-sm text-ink">{name}</code>
        <code className="text-caption text-muted">{value}</code>
      </div>
    </div>
  )
}

export default ColorSwatch
