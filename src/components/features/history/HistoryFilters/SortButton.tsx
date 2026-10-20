import { Button } from '@ds/primitives'
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ArchiveSort } from '../model'

type SortButtonProps = {
  onSortChange: (sort: ArchiveSort) => void
  sort: ArchiveSort
}

// Flips newest / oldest first; icon only on phones
const SortButton = ({ onSortChange, sort }: SortButtonProps) => {
  const t = useTranslations()
  const isNewestFirst = sort === 'desc'
  const SortIcon = isNewestFirst ? ArrowDownWideNarrow : ArrowUpNarrowWide

  return (
    <Button
      onClick={() => onSortChange(isNewestFirst ? 'asc' : 'desc')}
      size="sm"
      variant="secondary"
    >
      <SortIcon aria-hidden className="size-4" />
      <span className="max-sm:sr-only">
        {t(isNewestFirst ? 'forecast.history.filters.newest' : 'forecast.history.filters.oldest')}
      </span>
    </Button>
  )
}

export default SortButton
