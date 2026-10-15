'use client'

import { useState } from 'react'

import { Button } from '../../primitives'
import { FooterActions } from '../FooterActions'

import { Sheet, SheetHeader, SheetStepButtons, type SheetSteps } from '.'

const items = ['Wind slab', 'Persistent slab', 'Wet snow']
const paragraphs = Array.from({ length: 12 }, (_, index) => index)

const SheetGallery = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const steps: SheetSteps = {
    hasNext: index < items.length - 1,
    hasPrevious: index > 0,
    onNext: () => setIndex(index + 1),
    onPrevious: () => setIndex(index - 1),
  }

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        Open sheet
      </Button>
      <Sheet
        footer={
          <FooterActions note="Arrows or ←/→ step; each item starts at the top">
            <Button onClick={handleClose} variant="secondary">
              Done
            </Button>
          </FooterActions>
        }
        header={
          <SheetHeader
            closeLabel="Close"
            subtitle={`${index + 1} of ${items.length}`}
            title={items[index]}
          >
            <SheetStepButtons nextLabel="Next" previousLabel="Previous" steps={steps} />
          </SheetHeader>
        }
        isOpen={isOpen}
        isTall
        isWide
        onOpenChange={setIsOpen}
        scrollKey={index}
        steps={steps}
      >
        <div className="text-copy text-body flex flex-col gap-3 p-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {items[index]}: bottom sheet on mobile (swipe the header down), side panel from lg up.
            </p>
          ))}
        </div>
      </Sheet>
    </>
  )
}

export default SheetGallery
