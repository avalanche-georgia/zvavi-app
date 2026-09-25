type UseSingleToggleParams<T extends string> = {
  // Pressing the selected option again clears the value (→ null)
  isDeselectable: boolean
  onChange: (value: T | null) => void
  value: T | null
}

// Adapts base-ui ToggleGroup's array value to a single `T | null` value
const useSingleToggle = <T extends string>({
  isDeselectable,
  onChange,
  value,
}: UseSingleToggleParams<T>) => {
  const groupValue = value === null ? [] : [value]

  const handleValueChange = (values: T[]) => {
    const [nextValue = null] = values

    if (nextValue === null && !isDeselectable) return

    onChange(nextValue)
  }

  return { groupValue, handleValueChange }
}

export default useSingleToggle
