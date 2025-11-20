import clsx from 'clsx'

import type { AvalancheSize } from '@/business/types'

const SizeScale = ({ className, size }: { size: AvalancheSize; className?: string }) => {
  const barHeights = [24, 36, 48, 60, 72]

  return (
    <div className={clsx('flex items-end gap-1', className)}>
      {barHeights.map((height, i) => {
        const isActive = i < size

        return (
          <div
            key={height}
            className={clsx(
              'w-4 rounded-sm',
              isActive ? 'bg-violet-600' : 'bg-violet-300 opacity-30',
            )}
            style={{ height }}
          />
        )
      })}
    </div>
  )
}

export default SizeScale
