import styles from './AvalancheLoader.module.css'
import { crackHalves, flakes } from './geometry'
import { makeIds } from './ids'
import Layer from './Layer'

import { cn } from '@/lib/utils'

type OverlayProps = {
  crackWidth: number
  flake: number
  flakeStroke: number
  hasDetail: boolean
  lineWidth: number
  uid: string
}

// Everything drawn on top of the slope: edge lines, the crack and the falling snow
const Overlay = ({ crackWidth, flake, flakeStroke, hasDetail, lineWidth, uid }: OverlayProps) => {
  const { ref } = makeIds(uid)

  return (
    <>
      <Layer>
        <g clipPath={ref('silhouette')} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            className="stroke-snow-5"
            d="M84 20L62 62L46 92L28 112L6 148"
            strokeWidth={lineWidth}
          />
          {hasDetail && (
            <path
              className="stroke-surface"
              d="M84 20L88 62L90 104L92 148"
              strokeOpacity={0.75}
              strokeWidth={lineWidth}
            />
          )}
        </g>
      </Layer>
      {/* The window slides one way and the line inside it the other, so the line stays put */}
      {crackHalves.map(({ d, from, to }) => (
        <span
          key={d}
          className={cn('absolute inset-0 overflow-hidden', styles.crack)}
          style={{ '--from': from, '--to': to } as React.CSSProperties}
        >
          <Layer className={styles.crackLine}>
            <path
              className="stroke-primary"
              d={d}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={crackWidth}
            />
          </Layer>
        </span>
      ))}
      {flakes.map(({ cx, factor }, index) => (
        <Layer key={cx} className={cn(styles.flake, styles[`flake${index + 1}`])}>
          <circle
            className="fill-surface stroke-snow-6"
            cx={cx}
            cy="6"
            r={Math.round(flake * factor * 10) / 10}
            strokeWidth={flakeStroke}
          />
        </Layer>
      ))}
    </>
  )
}

export default Overlay
