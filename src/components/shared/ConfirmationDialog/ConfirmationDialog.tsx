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
        {/* TODO: Use proper colored buttons once they're available - https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1210772206117399?focus=true */}
        <Button className="ml-auto" onClick={onCancel || onClose}>
          {tActions('cancel')}
        </Button>
        <Button onClick={onConfirm}>{tActions(variant)}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmationDialog
