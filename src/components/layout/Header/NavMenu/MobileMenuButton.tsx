'use client'

import { useState } from 'react'
import { Icon } from '@components/icons'

import MobileNav from './MobileNav'

const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        aria-label="Open menu"
        className="size-6 cursor-pointer lg:hidden"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Icon icon="menu" size="lg" />
      </button>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default MobileMenuButton
