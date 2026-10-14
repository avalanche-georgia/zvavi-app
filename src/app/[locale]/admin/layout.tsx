'use client'

import { useBoolean } from '@components/hooks'
import {
  AdminErrorTracking,
  AdminPageHeader,
  AdminSidebar,
  MobileDrawer,
} from '@components/layout/admin'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'

type LayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Readonly<LayoutProps>) => {
  useCurrentUserProfileQuery()
  const [isMenuOpen, { setFalse: closeMenu, setTrue: openMenu }] = useBoolean(false)

  return (
    <div className="flex h-svh">
      <AdminErrorTracking />
      <AdminSidebar />

      <div className="flex h-full flex-1 flex-col">
        <AdminPageHeader onMenuOpen={openMenu} />
        {/* relative: the containing block for absolutely positioned content
            (e.g. sr-only labels), so it can't overflow the page itself */}
        <main className="bg-canvas relative flex-1 overflow-y-auto">{children}</main>
      </div>

      <MobileDrawer isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  )
}

export default AdminLayout
