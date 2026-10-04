'use client'

import useRovingRating from './useRovingRating'

import { cn } from '@/lib/utils'

export type RatingScaleOption<T extends string> = { label: string; value: T }

type RatingScaleProps<T extends string> = {
  // id of the visible row label
  ariaLabelledBy: string
  className?: string
  onChange: (value: T) => void
  options: RatingScaleOption<T>[]
  // Content of a segment (defaults to value + label)
  renderSegment?: (option: RatingScaleOption<T>, isSelected: boolean) => React.ReactNode
  // Extra classes per segment, e.g. a domain colour for the selected one
  segmentClassName?: (option: RatingScaleOption<T>, isSelected: boolean) => string
  value: T
}

// Equal segments, exactly one selected (a radio group), e.g. a 0–5 rating
const RatingScale = <T extends string>({
  ariaLabelledBy,
  className,
  onChange,
  options,
  renderSegment,
  segmentClassName,
  value,
}: RatingScaleProps<T>) => {
  const values = options.map((option) => option.value)
  const { handleKeyDown, setSegmentRef } = useRovingRating({ onChange, value, values })

  return (
    <div
      aria-labelledby={ariaLabelledBy}
      className={cn('grid auto-cols-fr grid-flow-col gap-1', className)}
      onKeyDown={handleKeyDown}
      role="radiogroup"
    >
      {options.map((option, index) => {
        const isSelected = option.value === value

        return (
          <button
            key={option.value}
            ref={setSegmentRef(index)}
            aria-checked={isSelected}
            aria-label={`${option.value} · ${option.label}`}
            className={cn(
              'focus-ring rounded-control flex flex-col items-center justify-center gap-0.5 transition-colors',
              isSelected ? 'bg-accent text-white' : 'bg-tile text-ink hover:bg-tile-hover',
              segmentClassName?.(option, isSelected),
            )}
            onClick={() => onChange(option.value)}
            role="radio"
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            {renderSegment ? (
              renderSegment(option, isSelected)
            ) : (
              <>
                <span className="text-copy-lg font-semibold">{option.value}</span>
                <span className="text-micro">{option.label}</span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default RatingScale
