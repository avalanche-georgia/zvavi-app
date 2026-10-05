'use client'

import { useEffect, useRef, useState } from 'react'
import { SearchField } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type SearchBoxProps = {
  onQueryChange: (query: string) => void
  query: string
  // Bumped by "Clear filters": drop the text and any write still waiting
  resetKey: number
}

const searchDelayMs = 250

// Local text, written to the URL after a pause in typing
const SearchBox = ({ onQueryChange, query, resetKey }: SearchBoxProps) => {
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
      aria-label={t('admin.forecasts.filters.search.label')}
      className="w-full sm:ml-auto sm:w-70"
      clearLabel={t('common.actions.clear')}
      onValueChange={handleValueChange}
      placeholder={t('admin.forecasts.filters.search.placeholder')}
      value={value}
    />
  )
}

export default SearchBox
