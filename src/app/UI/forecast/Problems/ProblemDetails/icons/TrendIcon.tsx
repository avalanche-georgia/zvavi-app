import clsx from 'clsx'

import type { Trend } from '@/business/types'

const TrendIcon = ({ value }: { value: Trend }) => {
  if (value === 'noChange') {
    return (
      <svg
        className="fill-violet-600"
        height="64"
        viewBox="0 0 52 52"
        width="64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="9" width="52" x="0" y="14" />
        <rect height="9" width="52" x="0" y="32" />
      </svg>
    )
  }

  const rotationClass = value === 'deteriorating' ? 'rotate-180' : ''

  return (
    <svg
      className={clsx('fill-violet-600', rotationClass)}
      height="64"
      viewBox="0 0 52 52"
      width="64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M27.73 6.93 L45.07 6.93 L45.07 25.07 H52 V0 H25.07 V6.93 Z" />
      <path d="M13.87 20.8 L31.2 20.8 L31.2 38.13 H38.13 V13.87 H13.87 V19.2 Z" />
      <path d="M19.07 34.67 L0.87 34.67 V26.8 H25.07 V50.13 H17.33 L17.33 32.53 Z" />
    </svg>
  )
}

export default TrendIcon
