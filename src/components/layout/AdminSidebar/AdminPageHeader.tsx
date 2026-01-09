'use client'

import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'
import { usePathname } from 'src/i18n/navigation'

import UserMenu from './UserMenu'

const titleKeyMap: Record<string, string> = {
  admin: 'title',
  edit: 'forecast.title.edit',
  forecasts: 'forecasts.title',
  new: 'forecast.title.create',
}

type AdminPageHeaderProps = {
  onOpenMenu: VoidFunction
}

const AdminPageHeader = ({ onOpenMenu }: AdminPageHeaderProps) => {
  const t = useTranslations('admin')
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments.at(-1) ?? 'admin'
  const title = t(titleKeyMap[lastSegment] ?? 'title')

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center">
        <button
          aria-label={t('sidebar.openMenu')}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          onClick={onOpenMenu}
          type="button"
        >
          <Icon className="size-5" icon="menu" />
        </button>
        <h1 className="ml-2 text-lg font-semibold md:ml-0">{title}</h1>
      </div>
      <UserMenu />
    </header>
  )
}

export default AdminPageHeader
