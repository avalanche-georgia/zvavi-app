'use client'

import { useBoolean } from '@components/hooks'
import { AdminPageHeader, AdminSidebar, MobileDrawer } from '@components/layout/admin'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'

type LayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Readonly<LayoutProps>) => {
  useCurrentUserProfileQuery()
  const [isOpen, { setFalse: close, setTrue: open }] = useBoolean(false)

  return (
    <div className="flex h-svh">
      <AdminSidebar />

      <div className="flex h-full flex-1 flex-col">
        <AdminPageHeader onOpenMenu={open} />
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default AdminLayout
