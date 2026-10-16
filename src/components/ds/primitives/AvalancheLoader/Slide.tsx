import styles from './AvalancheLoader.module.css'
import { clumps } from './clumps'
import { dusts, puffs } from './geometry'
import { makeIds } from './ids'

type SlideProps = { dust: number; puff: number; uid: string }

// The slab breaking into clumps, sliding down the slope, and the powder it throws up
const Slide = ({ dust, puff, uid }: SlideProps) => {
  const { ref } = makeIds(uid)

  return (
    <g clipPath={ref('ground')}>
      {clumps.map(({ d, style }) => (
        <g key={d} className={styles.clump} style={style}>
          <path d={d} fill={ref('slab')} />
        </g>
      ))}
      {puffs.map(([cx, cy, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          className={styles.puff}
          cx={cx}
          cy={cy}
          fill={ref('puff')}
          r={puff}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {dusts.map(([cx, cy, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          className={styles.dust}
          cx={cx}
          cy={cy}
          fill={ref('puff')}
          r={dust}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </g>
  )
}

export default Slide
