import { Button } from '@ds/primitives'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

type CoordinatesRowProps = {
  isEditing: boolean
  latitude: number | null
  longitude: number | null
  onEditingToggle: () => void
}

const CoordinatesRow = ({
  isEditing,
  latitude,
  longitude,
  onEditingToggle,
}: CoordinatesRowProps) => {
  const t = useTranslations()
  const hasPin = latitude != null && longitude != null

  return (
    <div className="text-copy flex items-center gap-2.5 px-0.5">
      <MapPin aria-hidden className="text-muted size-4.5 shrink-0" />
      <span className="min-w-0 flex-1 tabular-nums">
        {hasPin ? (
          `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
        ) : (
          <span className="text-muted">{t('observations.submit.location.noPin')}</span>
        )}
      </span>
      <Button aria-expanded={isEditing} onClick={onEditingToggle} variant="text">
        {t(
          hasPin
            ? 'observations.submit.location.edit'
            : 'observations.submit.location.enterCoordinates',
        )}
      </Button>
    </div>
  )
}

export default CoordinatesRow
