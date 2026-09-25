import { Button } from '@ds/primitives'
import { LocateFixed, Maximize2, Minimize2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

type MapOverlayControlsProps = {
  isExpanded: boolean
  isLocating: boolean
  onExpandedToggle: () => void
  onLocate: () => void
}

const MapOverlayControls = ({
  isExpanded,
  isLocating,
  onExpandedToggle,
  onLocate,
}: MapOverlayControlsProps) => {
  const t = useTranslations()
  const expandLabel = t(
    isExpanded ? 'observations.submit.location.collapse' : 'observations.submit.location.expand',
  )

  return (
    <div className="absolute top-2.5 right-2.5 z-1000 flex flex-col items-end gap-1.5">
      <Button isBusy={isLocating} onClick={onLocate} size="sm" variant="overlay">
        {!isLocating && <LocateFixed aria-hidden className="size-4" />}
        {t('observations.submit.location.myLocation')}
      </Button>
      <Button
        aria-label={expandLabel}
        aria-pressed={isExpanded}
        className="w-10 px-0"
        onClick={onExpandedToggle}
        size="sm"
        title={expandLabel}
        variant="overlay"
      >
        {isExpanded ? (
          <Minimize2 aria-hidden className="size-4" />
        ) : (
          <Maximize2 aria-hidden className="size-4" />
        )}
      </Button>
    </div>
  )
}

export default MapOverlayControls
