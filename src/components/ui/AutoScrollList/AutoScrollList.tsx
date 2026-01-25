'use client'

import AutoScroll, { type AutoScrollOptionsType } from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import type { ReactNode } from 'react'

type AutoScrollListProps = {
  children: ReactNode
  className?: string
  speed?: AutoScrollOptionsType['speed']
  direction?: AutoScrollOptionsType['direction']
}

const AutoScrollList = ({
  children,
  className,
  direction = 'forward',
  speed = 0.5,
}: AutoScrollListProps) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true }, [
    AutoScroll({
      direction,
      speed,
      startDelay: 500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])

  return (
    <div ref={emblaRef} className={className}>
      <ul className="-ml-2 flex [&>li]:pl-2">{children}</ul>
    </div>
  )
}

export default AutoScrollList
