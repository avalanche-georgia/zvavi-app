import type { AvalancheSize } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type SizeTileProps = {
  className?: string
  // Table rows: a small tile with the number only
  isCompact?: boolean
  size: AvalancheSize
}

const shadeClassNames: Record<AvalancheSize, string> = {
  1: 'bg-size-1 text-ink',
  2: 'bg-size-2 text-ink',
  3: 'bg-size-3 text-white',
  4: 'bg-size-4 text-white',
  5: 'bg-size-5 text-white',
}

// Size number on a tile that darkens with size — size is the first thing to
// scan for when reading a list of avalanches.
const SizeTile = ({ className, isCompact = false, size }: SizeTileProps) => {
  const t = useTranslations()

  if (isCompact) {
    return (
      <span
        className={cn(
          'text-copy rounded-item grid size-7.5 shrink-0 place-items-center font-bold tabular-nums',
          shadeClassNames[size],
          className,
        )}
      >
        <span aria-hidden>{size}</span>
        <span className="sr-only">{`${t('observations.labels.size')} ${size}`}</span>
      </span>
    )
  }

  return (
    <span
      className={cn(
        'rounded-field flex size-12 shrink-0 flex-col items-center justify-center leading-none',
        shadeClassNames[size],
        className,
      )}
    >
      <b className="text-heading leading-none font-bold">{size}</b>
      <span className="text-micro tracking-eyebrow mt-0.75 leading-none font-semibold uppercase opacity-80">
        {t('observations.labels.size')}
      </span>
    </span>
  )
}

export default SizeTile
