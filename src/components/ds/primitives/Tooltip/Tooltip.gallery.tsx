import { Pencil } from 'lucide-react'

import Tooltip from './Tooltip'
import { Button } from '../Button'

const TooltipGallery = () => (
  <div className="bg-canvas rounded-media flex flex-wrap items-center gap-3 p-3">
    <Tooltip label="Edit problem">
      <Button size="sm" variant="secondary">
        <Pencil aria-hidden className="size-4" />
        Hover or focus me
      </Button>
    </Tooltip>
  </div>
)

export default TooltipGallery
