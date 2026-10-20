'use client'

import { useRef, useState } from 'react'
import { Button, IconButton, Popover } from '@ds/primitives'
import { CalendarDays, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import DateRangePanel from './DateRangePanel'
import useDateFilterLabel from './useDateFilterLabel'
import { type ArchiveDateRange, type ArchiveSeason, emptyDateRange } from '../model'

type DateRangeFilterProps = ArchiveDateRange & {
  activeMonths: string[]
  onRangeChange: (range: ArchiveDateRange) => void
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
  const panelRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const label = useDateFilterLabel(from, to)
  const isActive = from !== null || to !== null

  // Keyboard users land on the calendar's focusable day, not the month arrows
  const getInitialFocus = () =>
    panelRef.current?.querySelector<HTMLElement>('button[data-day][tabindex="0"]') ?? true

  const handleClear = () => onRangeChange(emptyDateRange)

  return (
    <div className="flex items-center gap-0.5">
      <Popover
        ariaLabel={t('forecast.history.filters.dateRange')}
        initialFocus={getInitialFocus}
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
          ref={panelRef}
          activeMonths={activeMonths}
          from={from}
          onPanelClose={() => setIsOpen(false)}
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
