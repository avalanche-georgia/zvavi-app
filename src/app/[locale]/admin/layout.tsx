'use client'

import { useBoolean } from '@components/hooks'
import { AdminPageHeader, AdminSidebar, MobileDrawer } from '@components/layout'

type LayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Readonly<LayoutProps>) => {
  const [isOpen, { setFalse: close, setTrue: open }] = useBoolean(false)

  return (
    <div className="flex h-svh">
      <AdminSidebar />

      <div className="flex h-full flex-1 flex-col">
        <AdminPageHeader onOpenMenu={open} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default AdminLayout
