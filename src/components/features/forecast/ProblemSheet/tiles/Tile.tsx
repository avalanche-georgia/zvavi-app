import { Tooltip } from '@ds/primitives'
import { Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type TileProps = {
  children: React.ReactNode
  // Spans both columns
  isWide?: boolean
  label: string
  // Absent: the property has no explanation
  onInfoOpen?: VoidFunction
  value?: string
}

// Grey tile of the problem sheet: label + ⓘ, the value, then its picture
const Tile = ({ children, isWide = false, label, onInfoOpen, value }: TileProps) => {
  const t = useTranslations()
  const infoLabel = t('forecast.page.about', { field: label })

  return (
    <div
      className={cn(
        'bg-tile rounded-card flex min-w-0 flex-col gap-2.5 p-3',
        isWide && 'col-span-full',
      )}
    >
      <div className="flex min-h-4 items-center gap-1">
        <span className="text-muted text-caption min-w-0 flex-1 font-medium">{label}</span>
        {onInfoOpen && (
          <Tooltip label={infoLabel}>
            <button
              aria-label={infoLabel}
              className="focus-ring text-muted hover:bg-tile-hover hover:text-ink rounded-item relative -my-1.5 -mr-1.5 grid size-7 shrink-0 place-items-center transition-colors after:absolute pointer-coarse:after:-inset-2"
              onClick={onInfoOpen}
              type="button"
            >
              <Info aria-hidden className="size-4" />
            </button>
          </Tooltip>
        )}
      </div>
      {value && (
        <b className="text-ink text-heading -mt-1.5 font-semibold wrap-anywhere">{value}</b>
      )}
      <div className="mt-auto">{children}</div>
    </div>
  )
}

export default Tile
