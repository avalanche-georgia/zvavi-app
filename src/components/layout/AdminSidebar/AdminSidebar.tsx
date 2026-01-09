'use client'

import { useBoolean } from '@components/hooks'
import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'

import MobileDrawer from './MobileDrawer'
import SidebarContent from './SidebarContent'

type AdminSidebarProps = {
  children: React.ReactNode
}

const AdminSidebar = ({ children }: AdminSidebarProps) => {
  const [isOpen, { setFalse: close, setTrue: open }] = useBoolean(false)
  const t = useTranslations('admin')

  return (
    <div className="flex h-[calc(100svh-64px)]">
      <aside className="sticky top-0 hidden h-full w-56 shrink-0 overflow-y-auto border-r bg-white md:block">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-12 shrink-0 items-center border-b bg-white px-4 md:hidden">
          <button
            aria-label={t('sidebar.openMenu')}
            className="rounded-lg p-2 hover:bg-gray-100"
            onClick={open}
            type="button"
          >
            <Icon className="size-5" icon="menu" />
          </button>
          <span className="ml-3 font-medium text-primary">{t('title')}</span>
        </div>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default AdminSidebar
