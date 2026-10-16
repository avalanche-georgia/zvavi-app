import { Dialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'

import { IconButton } from '../../primitives'

// × at the start of a sheet header; the label doubles as its tooltip
const SheetCloseButton = ({ label }: { label: string }) => (
  <Dialog.Close render={<IconButton aria-label={label} size="md" />}>
    <X aria-hidden className="size-4.5" />
  </Dialog.Close>
)

export default SheetCloseButton
