import { cn } from '@/lib/utils'

type ProblemNumberProps = {
  className?: string
  number: number
}

// Priority badge: 1 = most important
const ProblemNumber = ({ className, number }: ProblemNumberProps) => (
  <span
    className={cn(
      'bg-ink grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white',
      className,
    )}
  >
    {number}
  </span>
)

export default ProblemNumber
