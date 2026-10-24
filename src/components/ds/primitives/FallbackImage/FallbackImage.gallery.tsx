import { ImageOff } from 'lucide-react'

import FallbackImage from './FallbackImage'

const workingSource = '/images/logo.png'
const brokenSource = '/images/missing.png'

const fallback = (
  <span className="bg-tile text-muted flex size-full items-center justify-center">
    <ImageOff aria-hidden className="size-6" />
  </span>
)

const demos = [
  { label: 'Loads', sources: [workingSource] },
  { label: 'First fails, next loads', sources: [brokenSource, workingSource] },
  { label: 'All fail → fallback', sources: [brokenSource] },
]

const FallbackImageGallery = () => (
  <div className="flex flex-wrap gap-4">
    {demos.map(({ label, sources }) => (
      <figure key={label} className="flex flex-col gap-2">
        <div className="rounded-media border-rule bg-surface size-24 overflow-hidden border p-2">
          <FallbackImage
            className="size-full object-contain"
            fallback={fallback}
            sources={sources}
          />
        </div>
        <figcaption className="text-caption text-muted">{label}</figcaption>
      </figure>
    ))}
  </div>
)

export default FallbackImageGallery
