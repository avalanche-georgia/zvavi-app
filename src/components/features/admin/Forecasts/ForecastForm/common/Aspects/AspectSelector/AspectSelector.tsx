import { useCallback } from 'react'
import type { Option } from '@components/ui'
import { aspects, sortedAspects } from '@domain/constants'
import type { Aspect } from '@domain/types'

import AspectOption from './AspectOption'

const aspectOptions = sortedAspects.map((aspect) => ({ label: aspects[aspect], value: aspect }))

type AspectSelectorProps = {
  onChange: (value: Aspect[]) => void
  selectedAspects: Aspect[]
}

const AspectSelector = ({ onChange, selectedAspects }: AspectSelectorProps) => {
  const handleChange = useCallback(
    (updatedOptions: Option[]) => {
      const updatedAspects = updatedOptions.map((option) => option.value as Aspect)

      onChange(updatedAspects)
    },
    [onChange],
  )

  const selectedOptions = aspectOptions.filter((option) =>
    selectedAspects.includes(option.value as Aspect),
  )

  return (
    <div className="inline-flex items-center gap-1 rounded bg-gray-100 p-1 text-sm dark:bg-white/5">
      {aspectOptions.map((option) => (
        <AspectOption
          key={option.value}
          onChange={handleChange}
          option={option}
          selectedOptions={selectedOptions}
        />
      ))}
    </div>
  )
}

export default AspectSelector
