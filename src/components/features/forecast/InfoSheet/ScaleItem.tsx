import { cn } from '@/lib/utils'

type ScaleItemProps = {
  badge: React.ReactNode
  // Colours of the badge; a white square by default
  badgeClassName?: string
  // "This problem" / "This forecast" — marks the item as the current value
  currentLabel?: string
  description: React.ReactNode
  name: string
}

// One step of a scale: badge · name · what it means
const ScaleItem = ({ badge, badgeClassName, currentLabel, description, name }: ScaleItemProps) => (
  <li
    className={cn(
      'rounded-media grid grid-cols-[36px_minmax(0,1fr)] items-start gap-3 p-3',
      currentLabel ? 'bg-surface shadow-[inset_0_0_0_2px_var(--color-accent)]' : 'bg-tile',
    )}
  >
    <span
      aria-hidden
      className={cn(
        'text-copy-lg rounded-control grid size-9 place-items-center font-bold',
        badgeClassName ?? 'bg-surface text-ink',
      )}
    >
      {badge}
    </span>
    <div className="min-w-0">
      <b className="text-ink text-copy-lg block font-semibold">
        {name}
        {currentLabel && (
          <span className="text-accent text-micro tracking-eyebrow ml-1.5 inline-block font-semibold uppercase">
            {currentLabel}
          </span>
        )}
      </b>
      <div className="text-body text-copy-sm mt-0.5">{description}</div>
    </div>
  </li>
)

export default ScaleItem
