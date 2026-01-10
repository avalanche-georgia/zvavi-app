import { Button } from '@components/ui'
import { Modal, ModalBody, ModalFooter, type ModalProps } from '@components/ui/Modal'
import { useTranslations } from 'next-intl'

export type ConfirmationDialogProps = Omit<ModalProps, 'children'> & {
  onConfirm: () => void
  onCancel?: () => void
  variant?: 'confirm' | 'delete'
  description?: string
}

const ConfirmationDialog = ({
  description,
  isOpen,
  onCancel,
  onClose,
  onConfirm,
  title,
  variant = 'confirm',
}: ConfirmationDialogProps) => {
  const tActions = useTranslations('common.actions')
  const tModal = useTranslations(`modal.${variant}`)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || tModal(`title`)}>
      <ModalBody>{description || tModal('description')}</ModalBody>
      <ModalFooter>
        <Button className="ml-auto" onClick={onCancel || onClose} variant="secondary">
          {tActions('cancel')}
        </Button>
        <Button onClick={onConfirm}>{tActions(variant)}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmationDialog
