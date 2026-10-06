import { Button } from '@components/ui'
import { Modal, ModalBody, ModalFooter, type ModalProps } from '@components/ui/Modal'
import { useTranslations } from 'next-intl'

export type ConfirmationDialogProps = Omit<ModalProps, 'children'> & {
  onConfirm: () => void
  onCancel?: () => void
  variant?: 'confirm' | 'delete'
  // Rich content (e.g. a summary list) is allowed, not only a sentence
  description?: React.ReactNode
  // Overrides the variant's generic label ("Confirm") with the action itself
  confirmLabel?: string
}

const ConfirmationDialog = ({
  confirmLabel,
  description,
  isOpen,
  onCancel,
  onClose,
  onConfirm,
  title,
  variant = 'confirm',
}: ConfirmationDialogProps) => {
  const t = useTranslations()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || t(`modal.${variant}.title`)}>
      <ModalBody>{description || t(`modal.${variant}.description`)}</ModalBody>
      <ModalFooter>
        <Button className="ml-auto" onClick={onCancel || onClose} variant="secondary">
          {t('common.actions.cancel')}
        </Button>
        <Button onClick={onConfirm}>{confirmLabel || t(`common.actions.${variant}`)}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmationDialog
