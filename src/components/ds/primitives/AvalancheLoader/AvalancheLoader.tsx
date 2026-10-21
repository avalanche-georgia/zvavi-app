import { useId } from 'react'

import styles from './AvalancheLoader.module.css'
import { box, round } from './geometry'
import Mountain from './Mountain'
import Overlay from './Overlay'
import SceneDefs from './SceneDefs'
import { type AvalancheLoaderSize, sizeConfigs } from './sizes'
import Slide from './Slide'

import { cn } from '@/lib/utils'

type AvalancheLoaderProps = {
  className?: string
  // Read out by screen readers ("Loading…"); the picture itself is silent
  label: string
  size?: AvalancheLoaderSize
}

// A mountain loader for blocks and whole pages: snow settles on a slope, a crack opens, the slab
// slides away and the loop starts over. For small inline spots use Spinner instead.
const AvalancheLoader = ({ className, label, size = 'md' }: AvalancheLoaderProps) => {
  const config = sizeConfigs[size]
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  // Line widths are given in rendered pixels and converted to the 160 × 160 drawing box
  const scale = box / config.px

  return (
    <span className={cn('inline-flex', config.box, className)} role="status">
      <svg aria-hidden className={cn('size-full', styles.root)} viewBox={`0 0 ${box} ${box}`}>
        <SceneDefs uid={uid} />
        <Mountain hasDetail={config.hasDetail} uid={uid} />
        <Slide dust={config.dust} puff={config.puff} uid={uid} />
        <Overlay
          crackWidth={round(config.crackPx * scale)}
          flake={config.flake}
          flakeStroke={round(0.7 * scale)}
          hasDetail={config.hasDetail}
          lineWidth={round(scale)}
          uid={uid}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default AvalancheLoader
