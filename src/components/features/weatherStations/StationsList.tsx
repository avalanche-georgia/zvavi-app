'use client'

import type { WeatherStation } from '@domain/types'

import StationRow from './StationRow'

type StationsListProps = {
  locale: string
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
  selectedId: string | null
  stations: WeatherStation[]
}

const StationsList = ({ locale, onHover, onSelect, selectedId, stations }: StationsListProps) => {
  if (!stations.length) return null

  return (
    <ul className="flex flex-col gap-2 px-4 pb-6">
      {stations.map((station) => (
        <StationRow
          key={station.id}
          isSelected={station.id === selectedId}
          locale={locale}
          onHover={onHover}
          onSelect={onSelect}
          station={station}
        />
      ))}
    </ul>
  )
}

export default StationsList
