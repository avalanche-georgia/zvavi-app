import { Trash2 } from 'lucide-react'

import ConfirmPopover from './ConfirmPopover'
import { IconButton } from '../IconButton'

const ConfirmPopoverGallery = () => (
  <div className="bg-canvas rounded-media flex flex-wrap items-center gap-3 p-3">
    <ConfirmPopover
      cancelLabel="Cancel"
      confirmLabel="Remove"
      message='Remove "Storm Slab" from this forecast?'
      onConfirm={() => undefined}
    >
      <IconButton aria-label="Remove" tone="danger">
        <Trash2 className="size-4" />
      </IconButton>
    </ConfirmPopover>
  </div>
)

export default ConfirmPopoverGallery
