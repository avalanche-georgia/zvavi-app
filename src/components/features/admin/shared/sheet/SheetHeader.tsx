import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type SheetHeaderProps = {
  // Extra controls after the title (prev / next, a link to the full page)
  children?: React.ReactNode
  title: string
}

// Header row of an admin sheet: close button, then the title
const SheetHeader = ({ children, title }: SheetHeaderProps) => {
  const t = useTranslations()

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X className="size-4.5" />
      </SheetClose>
      <SheetTitle className="text-copy-lg m-0 flex-1 truncate font-semibold">{title}</SheetTitle>
      {children}
    </>
  )
}

export default SheetHeader
