'use client'

import { useEffect, useRef, useState } from 'react'
import { SearchField } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type ListSearchBoxProps = {
  className?: string
  label: string
  onQueryChange: (query: string) => void
  placeholder: string
  query: string
  // Bumped by "Clear filters": drop the text and any write still waiting
  resetKey: number
}

const searchDelayMs = 250

// Local text, written to the list state (the URL) after a pause in typing
const ListSearchBox = ({
  className,
  label,
  onQueryChange,
  placeholder,
  query,
  resetKey,
}: ListSearchBoxProps) => {
  const t = useTranslations()
  const [value, setValue] = useState(query)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // The URL catches up a render later, so the cleared text can't come from `query`
  useEffect(() => {
    if (resetKey === 0) return
    clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue('')
  }, [resetKey])

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onQueryChange(nextValue), searchDelayMs)
  }

  return (
    <SearchField
      aria-label={label}
      className={cn('w-full sm:ml-auto sm:w-70', className)}
      clearLabel={t('common.actions.clear')}
      onValueChange={handleValueChange}
      placeholder={placeholder}
      value={value}
    />
  )
}

export default ListSearchBox
