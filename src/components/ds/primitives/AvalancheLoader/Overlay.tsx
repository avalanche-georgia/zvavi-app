import styles from './AvalancheLoader.module.css'
import { flakes } from './geometry'
import { makeIds } from './ids'

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
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          className={cn('stroke-primary', styles.crack)}
          d="M68 80L62 87L56 80L50.3 84"
          pathLength="100"
          strokeWidth={crackWidth}
        />
        <path
          className={cn('stroke-primary', styles.crack)}
          d="M68 80L74 87L80 80L86 87L89 84"
          pathLength="100"
          strokeWidth={crackWidth}
        />
      </g>
      {flakes.map(({ cx, factor }, index) => (
        <circle
          key={cx}
          className={cn('fill-surface stroke-snow-6', styles.flake, styles[`flake${index + 1}`])}
          cx={cx}
          cy="6"
          r={Math.round(flake * factor * 10) / 10}
          strokeWidth={flakeStroke}
        />
      ))}
    </>
  )
}

export default Overlay
