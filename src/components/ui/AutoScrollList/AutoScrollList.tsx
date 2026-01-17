'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import type { ReactNode } from 'react'

type AutoScrollListProps = {
  children: ReactNode
  className?: string
  speed?: number
}

const AutoScrollList = ({ children, className, speed = 0.5 }: AutoScrollListProps) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true }, [
    AutoScroll({ speed, startDelay: 500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])

  return (
    <div ref={emblaRef} className={className}>
      <ul className="-ml-2 flex [&>li]:pl-2">{children}</ul>
    </div>
  )
}

export default AutoScrollList
