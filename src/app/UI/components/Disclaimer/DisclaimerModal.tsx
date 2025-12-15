import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { Button, Checkbox } from '@/UI/components/inputs'
import { Modal, ModalBody, ModalFooter } from '@/UI/components/Modal'

const DisclaimerModal = ({ onAccept }: { onAccept: VoidFunction }) => {
  const t = useTranslations()
  const [isAccepted, setIsAccepted] = useState(false)

  const handleClose = () => {
    if (!isAccepted) return

    onAccept()
  }

  return (
    <Modal
      hideCloseButton
      isOpen
      onClose={handleClose}
      title={t('common.disclaimer.title')}
      titleClassName="text-center"
    >
      <ModalBody>
        <div className="mb-4 flex flex-col gap-6">
          <p>{t('common.disclaimer.content')}</p>
          <Checkbox
            className="bg-gray-200"
            isChecked={isAccepted}
            label={t('common.disclaimer.checkbox')}
            onChange={setIsAccepted}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button className="ml-auto" disabled={!isAccepted} onClick={handleClose}>
          {t('common.actions.continue')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DisclaimerModal
