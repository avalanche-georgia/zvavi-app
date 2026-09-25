import StickyActionBar from './StickyActionBar'
import { Button } from '../../primitives'

// Scroll inside the box to see the bar stick
const StickyActionBarGallery = () => (
  <div className="bg-canvas rounded-media border-rule h-64 overflow-y-auto border px-4">
    <div className="text-copy text-muted flex h-96 items-center justify-center">Scroll ↓</div>
    <StickyActionBar
      action={<Button size="lg">Submit</Button>}
      status={
        <>
          <b className="text-ink font-semibold">3 required</b> left · Location, Type, Trigger
        </>
      }
    />
  </div>
)

export default StickyActionBarGallery
