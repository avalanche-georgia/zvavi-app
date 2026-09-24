import { compassGrid } from '@domain/aspects'
import { aspects as aspectLabels, sortedAspects } from '@domain/constants'
import type { Aspect, ElevationZone } from '@domain/types'
import { useTranslations } from 'next-intl'

import usePaintDrag from './usePaintDrag'

import { cn } from '@/lib/utils'

type AspectCompassProps = {
  aspects: Aspect[]
  onChange: (aspects: Aspect[]) => void
  zone: ElevationZone
}

const focusRing =
  'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2'

// 3×3 compass for one zone; the centre toggles all eight aspects
const AspectCompass = ({ aspects, onChange, zone }: AspectCompassProps) => {
  const t = useTranslations()
  const { containerRef, ...pointerHandlers } = usePaintDrag({ aspects, onChange })
  const zoneLabel = t(`common.elevationZones.${zone}`)
  const isAllSelected = aspects.length === sortedAspects.length

  const handleAllClick = () => onChange(isAllSelected ? [] : sortedAspects)

  // Pointer taps are handled by the paint gesture; only keyboard activation
  // (Enter/Space, reported as a click with detail 0) lands here
  const handleCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail !== 0) return

    const aspect = event.currentTarget.dataset.aspect as Aspect

    onChange(
      aspects.includes(aspect)
        ? aspects.filter((selected) => selected !== aspect)
        : [...aspects, aspect],
    )
  }

  return (
    <div
      ref={containerRef}
      className="grid touch-pan-y grid-cols-[repeat(3,3.5rem)] justify-center gap-1.5 select-none sm:grid-cols-[repeat(3,3rem)]"
      onLostPointerCapture={pointerHandlers.onLostPointerCapture}
      onPointerCancel={pointerHandlers.onPointerCancel}
      onPointerDown={pointerHandlers.onPointerDown}
      onPointerMove={pointerHandlers.onPointerMove}
      onPointerUp={pointerHandlers.onPointerUp}
    >
      {compassGrid.map((aspect) => {
        if (aspect === null) {
          return (
            <button
              key="all"
              aria-label={t('common.aspectElevationPicker.allAria', { zone: zoneLabel })}
              aria-pressed={isAllSelected}
              className={cn(
                'text-accent hover:bg-accent-soft aspect-square rounded-full text-xs font-semibold uppercase transition-colors duration-120',
                focusRing,
              )}
              onClick={handleAllClick}
              type="button"
            >
              {t('common.aspectElevationPicker.all')}
            </button>
          )
        }

        const isSelected = aspects.includes(aspect)

        return (
          <button
            key={aspect}
            aria-label={t('common.aspectElevationPicker.cellAria', {
              aspect: t(`common.aspects.names.${aspect}`),
              zone: zoneLabel,
            })}
            aria-pressed={isSelected}
            className={cn(
              'aspect-square touch-pan-y rounded-xl text-[15px] font-medium transition-colors duration-120',
              isSelected
                ? 'bg-accent hover:bg-accent-hover text-white'
                : 'bg-tile text-ink hover:bg-tile-hover',
              focusRing,
            )}
            data-aspect={aspect}
            onClick={handleCellClick}
            type="button"
          >
            {aspectLabels[aspect]}
          </button>
        )
      })}
    </div>
  )
}

export default AspectCompass
