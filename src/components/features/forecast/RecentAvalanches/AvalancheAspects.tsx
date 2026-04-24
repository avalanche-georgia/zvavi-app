import type { Aspect, Aspects, AvalancheTrigger, ElevationZone } from '@domain/types'
import clsx from 'clsx'

import MountainIcon from './MountainIcon'

type Cell = Aspect | null

const compassLayout: Cell[][] = [
  ['nw', 'n', 'ne'],
  ['w', null, 'e'],
  ['sw', 's', 'se'],
]

const elevationZones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

const zoneLabels: Record<ElevationZone, string> = {
  alpine: 'Alpine',
  highAlpine: 'H. Alpine',
  subAlpine: 'Sub Alpine',
}

type AvalancheAspectsProps = {
  aspects: Aspects
  trigger: AvalancheTrigger | null
}

const AspectCell = ({ active, label }: { active: boolean; label: string }) => (
  <div
    className={clsx(
      'flex size-5 items-center justify-center rounded text-[9px] font-bold',
      active ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-400',
    )}
  >
    {label}
  </div>
)

const AvalancheAspects = ({ aspects, trigger }: AvalancheAspectsProps) => {
  const zonesWithAspects = elevationZones.filter((zone) => aspects[zone].length > 0)

  if (zonesWithAspects.length === 0 && !trigger) return null

  return (
    <div className="flex flex-none flex-col gap-2">
      {zonesWithAspects.map((zone) => {
        const activeSet = new Set(aspects[zone])

        return (
          <div key={zone} className="flex items-center gap-2 border-r pr-3 sm:pr-4">
            <div className="flex w-14 flex-none flex-col items-center gap-0.5">
              <MountainIcon activeZone={zone} />
              <span className="text-center text-[9px] font-bold tracking-wide text-gray-400 uppercase">
                {zoneLabels[zone]}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {compassLayout.map((row, rowIndex) =>
                row.map((cell, colIndex) =>
                  cell === null ? (
                    <div key={`${rowIndex}-${colIndex}`} className="size-5" />
                  ) : (
                    <AspectCell
                      key={cell}
                      active={activeSet.has(cell)}
                      label={cell.toUpperCase()}
                    />
                  ),
                ),
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AvalancheAspects
