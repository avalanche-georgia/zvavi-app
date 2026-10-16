'use client'

import { useState } from 'react'
import { IconButton } from '@ds/primitives'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'

import MobileNav from './MobileNav'

// The burger: shown below xl, where the desktop nav doesn't fit
const MobileMenuButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton
        aria-label={t('navigation.openMenu')}
        className="xl:hidden"
        onClick={() => setIsOpen(true)}
        size="md"
      >
        <Menu aria-hidden className="size-5.5" />
      </IconButton>

      <MobileNav isOpen={isOpen} isSignedIn={isSignedIn} onClose={() => setIsOpen(false)} />
    </>
  )
}

export default MobileMenuButton
