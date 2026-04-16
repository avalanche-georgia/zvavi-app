'use client'

import { useState } from 'react'

type UseDatePickerProps = {
  onChange: (date: Date | null) => void
  showTime: boolean
  value: Date | null
}

const useDatePicker = ({ onChange, showTime, value }: UseDatePickerProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null)

      return
    }

    if (showTime && value) date.setHours(value.getHours(), value.getMinutes())
    onChange(date)
    if (!showTime) setOpen(false)
  }

  const handleClear = () => onChange(null)

  return { handleClear, handleSelect, open, setOpen }
}

export default useDatePicker
