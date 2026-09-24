import { Icon } from '@components/icons'
import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

type AvalancheSheetHeaderProps = {
  // Hidden while editing — leaving the panel would drop the edits
  fullPageId: number | null
  title: string
}

const AvalancheSheetHeader = ({ fullPageId, title }: AvalancheSheetHeaderProps) => {
  const t = useTranslations()

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X className="size-4.5" />
      </SheetClose>
      <SheetTitle className="m-0 flex-1 truncate text-[15px] font-semibold">{title}</SheetTitle>
      {fullPageId !== null && (
        <Link
          aria-label={t('admin.recentAvalanches.view.openFullPage')}
          className="hover:bg-tile grid size-10 shrink-0 place-items-center rounded-[10px] transition-colors"
          href={routes.admin.recentAvalanches.view(fullPageId)}
        >
          <Icon icon="externalLink" size="sm" />
        </Link>
      )}
    </>
  )
}

export default AvalancheSheetHeader
