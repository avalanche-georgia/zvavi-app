import { useTranslations } from 'next-intl'

import FooterConfirm from './FooterConfirm'

type DiscardConfirmProps = {
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

// "Discard unsaved changes?" — asked before a sheet drops a dirty form
const DiscardConfirm = ({ onCancel, onConfirm }: DiscardConfirmProps) => {
  const t = useTranslations()

  return (
    <FooterConfirm
      cancelLabel={t('admin.shared.sheet.keepEditing')}
      confirmLabel={t('admin.shared.sheet.discard')}
      message={t('admin.shared.sheet.discardConfirm')}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}

export default DiscardConfirm
