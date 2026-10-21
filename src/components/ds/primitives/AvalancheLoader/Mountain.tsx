import styles from './AvalancheLoader.module.css'
import { bed, cutFace, slab } from './geometry'
import { makeIds } from './ids'

type MountainProps = { hasDetail: boolean; uid: string }

// The still part of the scene: distant ridges, bare ground, snowy faces and the slab on top
const Mountain = ({ hasDetail, uid }: MountainProps) => {
  const { ref } = makeIds(uid)

  return (
    <>
      {hasDetail && (
        <g>
          <polygon className="fill-snow-2" points="0,148 0,108 16,90 32,106 44,120 44,148" />
          <polygon className="fill-snow-3" points="112,148 126,102 142,72 160,58 160,148" />
          <polygon className="fill-snow-1" points="142,72 160,58 160,100 148,96" />
        </g>
      )}
      <ellipse className="fill-snow-2" cx="80" cy="149" rx="78" ry="5" />
      <g clipPath={ref('silhouette')}>
        <polygon fill={ref('bed')} points={bed} />
        {hasDetail && (
          <g
            className="stroke-rock-3"
            fill="none"
            strokeLinecap="round"
            strokeOpacity={0.4}
            strokeWidth="1"
          >
            <path d="M60 98L56 132" />
            <path d="M72 102L70 140" />
            <path d="M82 98L84 136" />
          </g>
        )}
        <polygon fill={ref('lit1')} points="84,20 62,62 88,62" />
        <polygon
          fill={ref('lit2')}
          points="62,62 88,62 89,84 86,87 80,80 74,87 68,80 62,87 56,80 50.3,84"
        />
        <polygon fill={ref('shadeA')} points="84,20 104,38 118,62 88,62" />
        <polygon fill={ref('shadeB')} points="88,62 118,62 132,84 138.25,104 90,104" />
        <polygon fill={ref('shadeC')} points="90,104 138.25,104 152,148 92,148" />
        {hasDetail && (
          <g>
            <polygon className="fill-rock-2" points="66,70 74,66 79,75 71,80" />
            <polygon className="fill-rock-3" points="101,82 112,78 117,90 106,95" />
          </g>
        )}
        <polygon className="fill-snow-5" points={cutFace} />
        <g className={styles.under}>
          <polygon className={styles.fill} fill={ref('slab')} points={slab} />
        </g>
      </g>
    </>
  )
}

export default Mountain
