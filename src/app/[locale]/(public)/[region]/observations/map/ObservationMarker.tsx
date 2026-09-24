import type { ObservationPoint } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Marker, Tooltip } from 'react-leaflet'

import observationPinIcon from './observationPinIcon'

type ObservationMarkerProps = {
  isSelected: boolean
  point: ObservationPoint
  onClick: (id: number) => void
}

const ObservationMarker = ({ isSelected, onClick, point }: ObservationMarkerProps) => {
  const t = useTranslations()
  const { id, latitude, longitude, size, type } = point

  const eventHandlers = { click: () => onClick(id) }
  const label = t('observations.labels.typeAndSize', {
    size,
    type: t(`common.avalancheTypes.${type}`),
  })

  return (
    <Marker
      eventHandlers={eventHandlers}
      icon={observationPinIcon(size, isSelected)}
      position={[latitude, longitude]}
      // Accessible name for the focusable pin (the tooltip isn't announced)
      title={label}
      // Selected on top, then larger avalanches over smaller ones
      zIndexOffset={isSelected ? 1000 : size * 10}
    >
      <Tooltip direction="top" offset={[0, -10]}>
        {label}
      </Tooltip>
    </Marker>
  )
}

export default ObservationMarker
