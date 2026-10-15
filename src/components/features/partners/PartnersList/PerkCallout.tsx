import { Gift } from 'lucide-react'

import PerkText from './PerkText'

// The perk spelled out in a green box (main partners, the supporter sheet)
const PerkCallout = ({ benefit }: { benefit: string }) => (
  <p className="bg-success-soft text-success rounded-control text-copy-sm flex max-w-[68ch] gap-2 self-start px-3 py-2.25 whitespace-pre-line">
    <Gift aria-hidden className="mt-px size-4 shrink-0" />
    <PerkText benefit={benefit} />
  </p>
)

export default PerkCallout
