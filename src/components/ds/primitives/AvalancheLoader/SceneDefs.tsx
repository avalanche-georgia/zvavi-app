import { silhouette } from './geometry'
import { makeIds } from './ids'

const Stop = ({ color, offset, opacity }: { color: string; offset: number; opacity?: number }) => (
  <stop offset={offset} stopColor={`var(--color-${color})`} stopOpacity={opacity} />
)

type Ramp = { from: string; id: string; to: string }

const ramps: Ramp[] = [
  { from: 'snow-1', id: 'lit1', to: 'snow-2' },
  { from: 'snow-2', id: 'lit2', to: 'snow-3' },
  { from: 'snow-4', id: 'shadeA', to: 'snow-5' },
  { from: 'snow-5', id: 'shadeB', to: 'snow-6' },
  { from: 'snow-6', id: 'shadeC', to: 'snow-7' },
  { from: 'rock-1', id: 'bed', to: 'rock-2' },
]

const SceneDefs = ({ uid }: { uid: string }) => {
  const { id } = makeIds(uid)

  return (
    <defs>
      <clipPath id={id('silhouette')}>
        <path d={silhouette} />
      </clipPath>
      <clipPath id={id('ground')}>
        <rect height="158" width="160" x="0" y="0" />
      </clipPath>
      {ramps.map((ramp) => (
        <linearGradient key={ramp.id} id={id(ramp.id)} x1="0" x2="0" y1="0" y2="1">
          <Stop color={ramp.from} offset={0} />
          <Stop color={ramp.to} offset={1} />
        </linearGradient>
      ))}
      {/* Tied to the slope rather than to each piece, so the clumps look like one slab */}
      <linearGradient gradientUnits="userSpaceOnUse" id={id('slab')} x1="0" x2="0" y1="80" y2="148">
        <Stop color="snow-1" offset={0} />
        <Stop color="snow-2" offset={0.5} />
        <Stop color="snow-4" offset={1} />
      </linearGradient>
      <radialGradient id={id('puff')}>
        <Stop color="surface" offset={0} opacity={0.95} />
        <Stop color="snow-2" offset={0.6} opacity={0.7} />
        <Stop color="snow-3" offset={1} opacity={0} />
      </radialGradient>
    </defs>
  )
}

export default SceneDefs
