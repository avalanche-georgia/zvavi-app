import { DialogList } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ConfirmationListProps = {
  items: React.ReactNode[]
  // Shown in full up to this many, then "+N more"
  max?: number
}

// The records a confirmation's action touches, inside its body
const ConfirmationList = ({ items, max }: ConfirmationListProps) => {
  const t = useTranslations()

  const moreLabel = (count: number) => t('common.confirmation.more', { count })

  return <DialogList items={items} max={max} moreLabel={moreLabel} />
}

export default ConfirmationList
