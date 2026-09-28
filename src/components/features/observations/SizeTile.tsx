import type { AvalancheSize } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type SizeTileProps = {
  className?: string
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
const SizeTile = ({ className, size }: SizeTileProps) => {
  const t = useTranslations()

  return (
    <div
      className={cn(
        'flex size-12 shrink-0 flex-col items-center justify-center rounded-[11px] leading-none',
        shadeClassNames[size],
        className,
      )}
    >
      <b className="text-[19px] font-bold">{size}</b>
      <span className="mt-0.75 text-[9.5px] font-semibold tracking-[.06em] uppercase opacity-80">
        {t('observations.labels.size')}
      </span>
    </div>
  )
}

export default SizeTile
