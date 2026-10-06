'use client'

import { useRef } from 'react'
import { Input } from '@base-ui/react/input'
import { Search, X } from 'lucide-react'

import { fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

type SearchFieldProps = {
  'aria-label': string
  className?: string
  clearLabel: string
  onValueChange: (value: string) => void
  placeholder?: string
  value: string
}

// Text input with a search icon and a clear button once something is typed
const SearchField = ({
  'aria-label': ariaLabel,
  className,
  clearLabel,
  onValueChange,
  placeholder,
  value,
}: SearchFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // The clear button disappears with the text — keep focus in the field
  const handleClear = () => {
    onValueChange('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn('relative', className)}>
      <Search
        aria-hidden
        className="text-placeholder pointer-events-none absolute top-1/2 left-3 size-4.5 -translate-y-1/2"
      />
      <Input
        ref={inputRef}
        aria-label={ariaLabel}
        className={cn(fieldControlClasses, 'focus-ring h-11.5 w-full pr-10 pl-9.5')}
        enterKeyHint="search"
        onValueChange={onValueChange}
        placeholder={placeholder}
        value={value}
      />
      {value && (
        <button
          aria-label={clearLabel}
          className="focus-ring text-muted hover:text-ink rounded-control absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center after:absolute pointer-coarse:after:-inset-1.5"
          onClick={handleClear}
          type="button"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

export default SearchField
