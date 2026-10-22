import styles from './AvalancheLoader.module.css'
import { slab } from './geometry'
import { makeIds } from './ids'
import Layer from './Layer'

import { cn } from '@/lib/utils'

// The snow slab settling in, one seamless shape, until the clumps take over from it
const Settle = ({ uid }: { uid: string }) => {
  const { ref } = makeIds(uid)

  return (
    <span className={cn('absolute inset-0', styles.under)}>
      <Layer className={styles.fill}>
        <polygon clipPath={ref('silhouette')} fill={ref('slab')} points={slab} />
      </Layer>
    </span>
  )
}

export default Settle
