import type { ElevationZone } from '@domain/types'
import clsx from 'clsx'

// M-shaped mountain, viewBox 100×90, asymmetric peaks
// Outline: (8,82) → left peak (33,22) → valley (50,42) → right peak (67,8) → (92,82)
// Zone boundaries at y=42 (highAlpine/alpine) and y=62 (alpine/subAlpine)
// highAlpine 8→42 (34 units), alpine 42→62 (20), subAlpine 62→82 (20)
// Left edge (8,82)→(33,22) at y=42: x≈25, at y=62: x≈16
// Right edge (67,8)→(92,82) at y=42: x≈79, at y=62: x≈85

const mountainOutline = 'M 8,82 L 33,22 L 50,42 L 67,8 L 92,82 Z'

const zonePoints: Record<ElevationZone, string> = {
  alpine: '25,42 16,62 85,62 79,42',
  highAlpine: '25,42 33,22 50,42 67,8 79,42',
  subAlpine: '16,62 8,82 92,82 85,62',
}

const allZones: ElevationZone[] = ['highAlpine', 'alpine', 'subAlpine']

const MountainIcon = ({ activeZone }: { activeZone: ElevationZone }) => (
  <svg className="w-14" viewBox="0 0 100 90">
    {allZones.map((zone) => (
      <polygon
        key={zone}
        className={clsx(zone === activeZone ? 'fill-violet-600' : 'fill-violet-100')}
        points={zonePoints[zone]}
      />
    ))}
    <path
      className="fill-none stroke-violet-700"
      d={mountainOutline}
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
)

export default MountainIcon
