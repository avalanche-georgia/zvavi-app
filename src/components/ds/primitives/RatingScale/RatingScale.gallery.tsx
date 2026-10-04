'use client'

import { useState } from 'react'

import RatingScale from './RatingScale'

const options = ['None', 'Low', 'Fair', 'Good', 'Great', 'Best'].map((label, index) => ({
  label,
  value: String(index),
}))

const RatingScaleGallery = () => {
  const [value, setValue] = useState('2')

  return (
    <div className="flex max-w-xl flex-col gap-2">
      <span className="text-copy-sm font-semibold" id="rating-scale-demo">
        Rating (arrow keys or 0–5)
      </span>
      <RatingScale
        ariaLabelledBy="rating-scale-demo"
        className="h-14"
        onChange={setValue}
        options={options}
        value={value}
      />
    </div>
  )
}

export default RatingScaleGallery
