'use client'

import { useState } from 'react'
import { Button, IconButton, Popover } from '@ds/primitives'
import { CalendarDays, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import DateRangePanel from './DateRangePanel'
import useDateFilterLabel from './useDateFilterLabel'
import type { ArchiveSeason } from '../model'

type DateRange = { from: string | null; to: string | null }

type DateRangeFilterProps = DateRange & {
  activeMonths: string[]
  onRangeChange: (range: DateRange) => void
  season: ArchiveSeason
}

// "Dates" button opening a calendar + month presets. Once set, a × beside it
// clears the dates without opening the popover.
const DateRangeFilter = ({
  activeMonths,
  from,
  onRangeChange,
  season,
  to,
}: DateRangeFilterProps) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const label = useDateFilterLabel(from, to)
  const isActive = from !== null || to !== null

  const handleClear = () => onRangeChange({ from: null, to: null })

  return (
    <div className="flex items-center gap-0.5">
      <Popover
        ariaLabel={t('forecast.history.filters.dateRange')}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button isActive={isActive} size="sm" variant="secondary">
            <CalendarDays aria-hidden className="size-4" />
            {label ?? t('forecast.history.filters.dates')}
          </Button>
        }
      >
        <DateRangePanel
          activeMonths={activeMonths}
          from={from}
          onClose={() => setIsOpen(false)}
          onRangeChange={onRangeChange}
          season={season}
          to={to}
        />
      </Popover>
      {isActive && (
        <IconButton aria-label={t('forecast.history.filters.clearDates')} onClick={handleClear}>
          <X aria-hidden className="size-4" />
        </IconButton>
      )}
    </div>
  )
}

export default DateRangeFilter
