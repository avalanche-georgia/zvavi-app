import { cn } from 'src/lib/utils'

import { IconButton } from './IconButton'
import TextInput from './TextInput'

type SearchInputProps = {
  className?: string
  onChange: (value: string) => void
  placeholder?: string
  value: string
}

const SearchInput = ({ className, onChange, placeholder, value }: SearchInputProps) => (
  <div className={cn('relative', className)}>
    <TextInput
      className="w-full pr-8"
      leftIcon="search"
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      value={value}
    />
    {value && (
      <IconButton
        aria-label="Clear search"
        className="absolute top-1/2 right-1 -translate-y-1/2"
        iconProps={{ icon: 'xMark' }}
        onClick={() => onChange('')}
        size="sm"
      />
    )}
  </div>
)

export default SearchInput
