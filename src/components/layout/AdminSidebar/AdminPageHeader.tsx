'use client'

import { Icon } from '@components/icons'
import { useTranslations } from 'next-intl'
import { usePathname } from 'src/i18n/navigation'

import { resolvePageTitleKey } from './resolvePageTitleKey'
import UserMenu from './UserMenu'

type AdminPageHeaderProps = {
  onOpenMenu: VoidFunction
}

const AdminPageHeader = ({ onOpenMenu }: AdminPageHeaderProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const titleKey = resolvePageTitleKey(pathname)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center">
        <button
          aria-label={t('admin.sidebar.openMenu')}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          onClick={onOpenMenu}
          type="button"
        >
          <Icon className="size-5" icon="menu" />
        </button>
        <h1 className="ml-2 text-lg font-semibold md:ml-0">{t(titleKey)}</h1>
      </div>
      <UserMenu />
    </header>
  )
}

export default AdminPageHeader
