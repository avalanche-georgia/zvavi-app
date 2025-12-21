import { useCallback } from 'react'
import type { Option } from '@components/ui'
import clsx from 'clsx'

type AspectOptionProps = {
  option: Option
  onChange: (value: Option[]) => void
  selectedOptions: Option[]
}

const AspectOption = ({ onChange, option, selectedOptions }: AspectOptionProps) => {
  const isSelected = selectedOptions.includes(option)

  const handleToggle = useCallback(() => {
    const updatedOptions = isSelected
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option]

    onChange(updatedOptions)
  }, [isSelected, onChange, option, selectedOptions])

  return (
    <button
      className={clsx(
        'flex size-7 items-center justify-center rounded text-gray-900 outline-none transition ',
        isSelected ? 'bg-white/90' : 'hover:bg-black/[0.03]',
      )}
      onClick={handleToggle}
      type="button"
    >
      <span className={clsx({ 'text-primary': isSelected })}>{option.label}</span>
    </button>
  )
}

export default AspectOption
