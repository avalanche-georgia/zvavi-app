'use client'

import { IconButton } from '@ds/primitives'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'src/i18n/navigation'

import { usePageTitle } from './usePageTitle'
import UserMenu from './UserMenu'

const AdminPageHeader = ({ onMenuOpen }: { onMenuOpen: VoidFunction }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const title = usePageTitle(pathname)

  return (
    <header className="border-rule bg-surface flex h-14 shrink-0 items-center justify-between gap-4 border-b px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <IconButton
          aria-label={t('admin.sidebar.openMenu')}
          className="-ml-2 md:hidden"
          onClick={onMenuOpen}
        >
          <Menu className="size-5" />
        </IconButton>
        <h1 className="text-heading text-ink truncate font-bold">{title}</h1>
      </div>
      <UserMenu />
    </header>
  )
}

export default AdminPageHeader
