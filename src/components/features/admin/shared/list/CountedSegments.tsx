import { SegmentedControl } from '@ds/primitives'

type CountedSegmentsProps<TValue extends string> = {
  ariaLabel: string
  counts: Record<TValue, number>
  getLabel: (value: TValue) => string
  onChange: (value: TValue) => void
  options: readonly TValue[]
  value: TValue
}

// A filter as segments, each with the number of rows it would show
const CountedSegments = <TValue extends string>({
  ariaLabel,
  counts,
  getLabel,
  onChange,
  options,
  value,
}: CountedSegmentsProps<TValue>) => {
  const segments = options.map((option) => {
    const label = getLabel(option)

    return {
      ariaLabel: `${label} (${counts[option]})`,
      label: (
        <>
          {label}
          <span className="text-muted font-medium tabular-nums">{counts[option]}</span>
        </>
      ),
      value: option,
    }
  })

  return (
    <SegmentedControl
      ariaLabel={ariaLabel}
      className="max-w-full overflow-x-auto"
      onChange={onChange}
      options={segments}
      value={value}
    />
  )
}

export default CountedSegments
