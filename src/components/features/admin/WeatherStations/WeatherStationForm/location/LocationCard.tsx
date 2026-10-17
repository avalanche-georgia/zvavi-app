'use client'

import { useState } from 'react'
import CoordinateInputs from '@components/features/observations/form/sections/LocationSection/CoordinateInputs'
import CoordinatesRow from '@components/features/observations/form/sections/LocationSection/CoordinatesRow'
import { useBoolean } from '@components/hooks'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import StationLocationMap from './StationLocationMap'
import useStationCoordinates from './useStationCoordinates'

// Where the station is: a pin on the map of Georgia, or typed coordinates
const LocationCard = () => {
  const t = useTranslations()
  const { error, handleCoordinatesChange, handleLocationPick, latitude, longitude, panTarget } =
    useStationCoordinates()
  const [isExpanded, { toggle: toggleExpanded }] = useBoolean(false)
  const [isEditingCoordinates, setIsEditingCoordinates] = useState(false)

  const handleEditingToggle = () => setIsEditingCoordinates((isEditing) => !isEditing)

  return (
    <FormCard
      error={error}
      required
      requiredText={t('common.validation.required')}
      title={t('admin.weatherStations.form.locationSection')}
    >
      <div className="flex flex-col gap-3">
        <StationLocationMap
          isExpanded={isExpanded}
          latitude={latitude}
          longitude={longitude}
          onExpandedToggle={toggleExpanded}
          onLocationPick={handleLocationPick}
          panTarget={panTarget}
        />
        <CoordinatesRow
          isEditing={isEditingCoordinates}
          latitude={latitude}
          longitude={longitude}
          onEditingToggle={handleEditingToggle}
        />
        {isEditingCoordinates && (
          <CoordinateInputs
            latitude={latitude}
            longitude={longitude}
            onCoordinatesChange={handleCoordinatesChange}
          />
        )}
      </div>
    </FormCard>
  )
}

export default LocationCard
