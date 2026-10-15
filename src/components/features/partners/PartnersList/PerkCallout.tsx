import { Gift } from 'lucide-react'

import PerkText from './PerkText'

type PerkCalloutProps = {
  benefit: string
  // "Perk:" before the text — left out where the context already says it (the sheet)
  hasLabel?: boolean
}

// The perk spelled out in a green box (main partners, the supporter sheet)
const PerkCallout = ({ benefit, hasLabel = true }: PerkCalloutProps) => (
  <p className="bg-success-soft text-success rounded-control text-copy-sm flex max-w-[68ch] gap-2 self-start px-3 py-2.25 whitespace-pre-line">
    <Gift aria-hidden className="mt-px size-4 shrink-0" />
    {hasLabel ? <PerkText benefit={benefit} /> : <span>{benefit}</span>}
  </p>
)

export default PerkCallout
