'use client'

import { AdminSidebar } from '@components/layout'

type LayoutProps = {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Readonly<LayoutProps>) => <AdminSidebar>{children}</AdminSidebar>

export default AdminLayout
