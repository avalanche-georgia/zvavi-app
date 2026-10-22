import type { AvalancheSize } from '@domain/types'
import { useTranslations } from 'next-intl'

import Tile from './Tile'

import { cn } from '@/lib/utils'

type SizeBarsTileProps = {
  onInfoOpen: VoidFunction
  size: AvalancheSize
}

const sizes: AvalancheSize[] = [1, 2, 3, 4, 5]

// Five rising bars, filled up to the problem's size
const SizeBarsTile = ({ onInfoOpen, size }: SizeBarsTileProps) => {
  const t = useTranslations()

  return (
    <Tile
      label={t('forecast.sections.avalancheProblems.modal.labels.size')}
      onInfoOpen={onInfoOpen}
      value={String(size)}
    >
      <div aria-hidden className="flex h-10 items-end gap-1">
        {sizes.map((barSize) => (
          <i
            key={barSize}
            className={cn('rounded-bar flex-1', barSize <= size ? 'bg-accent' : 'bg-off')}
            style={{ height: `${barSize * 20}%` }}
          />
        ))}
      </div>
    </Tile>
  )
}

export default SizeBarsTile
