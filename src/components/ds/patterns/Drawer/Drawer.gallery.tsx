'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

import { Button, IconButton } from '../../primitives'

import { Drawer, DrawerClose, type DrawerSide, DrawerTitle } from '.'

const links = ['Forecasts', 'Observations', 'Partners']

const DrawerGallery = () => {
  const [openSide, setOpenSide] = useState<DrawerSide | null>(null)

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setOpenSide(null)
  }

  const renderDrawer = (side: DrawerSide) => (
    <Drawer
      description="Demo navigation"
      isOpen={openSide === side}
      onOpenChange={handleOpenChange}
      side={side}
    >
      <div className="border-rule flex items-center justify-between border-b py-2 pr-2 pl-4">
        <DrawerTitle className="text-heading m-0 font-semibold">Menu</DrawerTitle>
        <DrawerClose render={<IconButton aria-label="Close menu" size="md" />}>
          <X aria-hidden className="size-5" />
        </DrawerClose>
      </div>
      <nav className="flex flex-col py-2">
        {links.map((link) => (
          <DrawerClose key={link} className="text-copy-lg hover:bg-tile px-4 py-3 text-left">
            {link}
          </DrawerClose>
        ))}
      </nav>
    </Drawer>
  )

  return (
    <div className="flex gap-3">
      <Button onClick={() => setOpenSide('left')} variant="secondary">
        From the left
      </Button>
      <Button onClick={() => setOpenSide('top')} variant="secondary">
        From the top
      </Button>
      {renderDrawer('left')}
      {renderDrawer('top')}
    </div>
  )
}

export default DrawerGallery
