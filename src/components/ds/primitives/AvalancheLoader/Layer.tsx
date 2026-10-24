import { box } from './geometry'

import { cn } from '@/lib/utils'

type LayerProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

// One full-box sheet of the scene. Anything that moves is drawn on a layer of its own and the
// animation runs on this <span>, never inside the SVG: Chrome repaints an SVG whose contents
// animate on every frame, and while the page repaints, hover backgrounds elsewhere blink.
// Transforms and opacity on a <span> stay on the compositor. Gradients and clip paths are
// referenced by id, so a layer can use the ones defined in SceneDefs.
const Layer = ({ children, className, style }: LayerProps) => (
  <span aria-hidden className={cn('absolute inset-0', className)} style={style}>
    <svg className="size-full" viewBox={`0 0 ${box} ${box}`}>
      {children}
    </svg>
  </span>
)

export default Layer
