'use client'

import { useState } from 'react'

import RadioGroup from './RadioGroup'

type PaymentMethod = 'bank' | 'card' | 'contact' | 'wise'

const options: { disabled?: boolean; label: string; value: PaymentMethod }[] = [
  { label: 'Bank transfer (GEL)', value: 'bank' },
  { label: 'Wise', value: 'wise' },
  { disabled: true, label: 'Card (coming soon)', value: 'card' },
  { label: 'None of the above — please contact me', value: 'contact' },
]

const RadioGroupGallery = () => {
  const [value, setValue] = useState<PaymentMethod | null>('bank')

  return (
    <RadioGroup
      ariaLabel="Payment method"
      onValueChange={setValue}
      options={options}
      value={value}
    />
  )
}

export default RadioGroupGallery
