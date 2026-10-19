'use client'

import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { enUS } from 'react-day-picker/locale'

import Popover from './Popover'
import { Button } from '../Button'
import { Calendar } from '../Calendar'

const PopoverGallery = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>()

  const handleReset = () => setRange(undefined)
  const handleDone = () => setIsOpen(false)

  return (
    <div className="flex flex-wrap items-start gap-4">
      <Popover
        ariaLabel="About this list"
        trigger={
          <Button size="sm" variant="secondary">
            Uncontrolled
          </Button>
        }
      >
        <p className="text-copy-sm text-body max-w-64">
          Any content. Esc or a click outside closes it.
        </p>
      </Popover>

      <Popover
        ariaLabel="Date range"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button isActive={range !== undefined} size="sm" variant="secondary">
            <CalendarDays aria-hidden className="size-4" />
            Dates
          </Button>
        }
      >
        <Calendar locale={enUS} mode="range" onSelect={setRange} selected={range} />
        <div className="border-rule mt-2 flex justify-end gap-2 border-t pt-3">
          <Button onClick={handleReset} size="sm" variant="secondary">
            Reset
          </Button>
          <Button onClick={handleDone} size="sm" variant="primary">
            Done
          </Button>
        </div>
      </Popover>
    </div>
  )
}

export default PopoverGallery
