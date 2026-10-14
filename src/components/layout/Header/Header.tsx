'use client'

import { useAuth } from '@components/hooks'
import { LanguageToggle, RegionSelect } from '@components/shared'
import { useRegionContext } from '@domain/context/RegionContext'

import AccountButton from './AccountButton'
import HeaderLogo from './HeaderLogo'
import { DesktopNav, MobileMenuButton } from './NavMenu'

// Site header on every public page. Stays the first <header> in the DOM —
// useHeaderHeight measures it.
const Header = () => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const { regions } = useRegionContext()

  return (
    <header className="border-rule bg-surface/92 sticky inset-x-0 top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-310 items-center gap-2 px-4 md:px-5 xl:px-8">
        <HeaderLogo />
        <DesktopNav />

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageToggle className="hidden xl:flex" />
          {regions.length > 1 && (
            <div className="hidden sm:block">
              <RegionSelect />
            </div>
          )}
          <AccountButton isLoading={isLoading} user={user} />
          <MobileMenuButton isSignedIn={isAuthenticated} />
        </div>
      </div>
    </header>
  )
}

export default Header
