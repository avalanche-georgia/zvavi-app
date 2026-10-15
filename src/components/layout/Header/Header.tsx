'use client'

import { useAuth } from '@components/hooks'
import { LanguageToggle, RegionSwitcher } from '@components/shared'

import AccountButton from './AccountButton'
import HeaderLogo from './HeaderLogo'
import { DesktopNav, MobileMenuButton } from './NavMenu'

// Site header on every public page. Stays the first <header> in the DOM —
// useHeaderHeight measures it.
const Header = () => {
  const { isAuthenticated, user } = useAuth()

  return (
    <header className="border-rule bg-surface/92 sticky inset-x-0 top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-310 items-center gap-2 px-4 md:px-5 xl:px-8">
        <HeaderLogo isPriority />
        <DesktopNav />

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageToggle className="hidden xl:flex" />
          <RegionSwitcher className="hidden sm:flex" />
          <AccountButton user={user} />
          <MobileMenuButton isSignedIn={isAuthenticated} />
        </div>
      </div>
    </header>
  )
}

export default Header
