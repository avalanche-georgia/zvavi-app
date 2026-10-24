import styles from './AvalancheLoader.module.css'
import { clumps } from './clumps'
import { dusts, percent, puffs } from './geometry'
import { makeIds } from './ids'
import Layer from './Layer'

type SlideProps = { dust: number; puff: number; uid: string }

// The slab breaking into clumps, sliding down the slope, and the powder it throws up. Each piece
// is a layer of its own; the box clips whatever slides past its edge.
const Slide = ({ dust, puff, uid }: SlideProps) => {
  const { ref } = makeIds(uid)

  return (
    <span className="absolute inset-0 overflow-hidden">
      {clumps.map(({ d, style }) => (
        <Layer key={d} className={styles.clump} style={style}>
          <path d={d} fill={ref('slab')} />
        </Layer>
      ))}
      {puffs.map(([cx, cy, delay]) => (
        <Layer
          key={`${cx}-${cy}`}
          className={styles.puff}
          style={{ animationDelay: `${delay}s`, transformOrigin: `${percent(cx)} ${percent(cy)}` }}
        >
          <circle cx={cx} cy={cy} fill={ref('puff')} r={puff} />
        </Layer>
      ))}
      {/* Dust grows from the ground up */}
      {dusts.map(([cx, cy, delay]) => (
        <Layer
          key={`${cx}-${cy}`}
          className={styles.dust}
          style={{
            animationDelay: `${delay}s`,
            transformOrigin: `${percent(cx)} ${percent(cy + dust)}`,
          }}
        >
          <circle cx={cx} cy={cy} fill={ref('puff')} r={dust} />
        </Layer>
      ))}
    </span>
  )
}

export default Slide
