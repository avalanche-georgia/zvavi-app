import { Button } from '@components/ui'
import { useTranslations } from 'next-intl'

type FooterProps = {
  onCancel: () => void
  onSave: () => void
}

const Footer = ({ onCancel, onSave }: FooterProps) => {
  const tCommon = useTranslations('common')

  return (
    <div className="flex items-center justify-end gap-4">
      <Button onClick={onCancel}>{tCommon('actions.cancel')}</Button>
      <Button onClick={onSave}>{tCommon('actions.save')}</Button>
    </div>
  )
}

export default Footer
