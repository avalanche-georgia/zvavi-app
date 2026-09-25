import type { AvalancheSize } from '@domain/types'

const SizeBadge = ({ size }: { size: AvalancheSize }) => (
  <span className="flex size-6 items-center justify-center rounded-sm bg-gray-200 text-sm font-bold">
    {size}
  </span>
)

export default SizeBadge
