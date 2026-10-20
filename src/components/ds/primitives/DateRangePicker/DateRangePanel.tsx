'use client'

import type { DateRange, Locale, Matcher } from 'react-day-picker'
import { useMediaQuery } from 'usehooks-ts'

import DateRangeEnds from './DateRangeEnds'
import type { ActiveEnd, DayRange } from './dayRange'
import type { DateRangePreset } from './types'
import { Button } from '../Button'
import { Calendar } from '../Calendar'
import { ChipGroup } from '../ChipGroup'

type DateRangePanelProps = {
  activeEnd: ActiveEnd
  bounds: { disabled: Matcher[]; endMonth: Date; startMonth: Date }
  calendarKey: number
  clearLabel?: string
  doneLabel: string
  fromLabel: string
  locale: Locale
  onDaySelect: (range: DateRange | undefined, day: Date) => void
  onDone: VoidFunction
  onEndClear: (end: 'from' | 'to') => void
  onEndSelect: (end: 'from' | 'to') => void
  onPresetSelect: (range: DayRange | null) => void
  presets?: DateRangePreset[]
  presetsLabel?: string
  selected: DateRange | undefined
  today: Date
  toLabel: string
  value: DayRange
}

// The popup of a DateRangePicker: quick ranges, the two ends, a range calendar
// (two months side by side from 640px) and Done
const DateRangePanel = ({ presets = [], value, ...props }: DateRangePanelProps) => {
  const isWide = useMediaQuery('(min-width: 40rem)')
  const activePreset = presets.findIndex(
    ({ range }) => range.from === value.from && range.to === value.to,
  )

  const handlePresetChange = (index: string | null) =>
    props.onPresetSelect(index === null ? null : presets[Number(index)].range)

  return (
    <div className="flex flex-col gap-3">
      {presets.length > 0 && (
        <ChipGroup
          ariaLabel={props.presetsLabel}
          isDeselectable
          onChange={handlePresetChange}
          options={presets.map(({ label }, index) => ({ label, value: String(index) }))}
          value={activePreset === -1 ? null : String(activePreset)}
        />
      )}
      <DateRangeEnds
        activeEnd={props.activeEnd}
        clearLabel={props.clearLabel}
        fromLabel={props.fromLabel}
        locale={props.locale}
        onEndClear={props.onEndClear}
        onEndSelect={props.onEndSelect}
        toLabel={props.toLabel}
        value={value}
      />
      <Calendar
        key={props.calendarKey}
        // Focus the day on open; a quick range remounts it without taking focus from the chip
        autoFocus={props.calendarKey === 0}
        className="mx-auto"
        defaultMonth={props.selected?.from ?? props.today}
        disabled={props.bounds.disabled}
        endMonth={props.bounds.endMonth}
        locale={props.locale}
        mode="range"
        numberOfMonths={isWide ? 2 : 1}
        onSelect={props.onDaySelect}
        selected={props.selected}
        startMonth={props.bounds.startMonth}
        today={props.today}
      />
      <div className="border-rule flex justify-end border-t pt-3">
        <Button onClick={props.onDone} size="sm" variant="primary">
          {props.doneLabel}
        </Button>
      </div>
    </div>
  )
}

export default DateRangePanel
