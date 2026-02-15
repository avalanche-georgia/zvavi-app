import { useState } from 'react'
import { LanguageToggle } from '@components/shared'
import { Button, Checkbox } from '@components/ui'
import { Modal, ModalBody, ModalFooter } from '@components/ui/Modal'
import { useTranslations } from 'next-intl'

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
            isChecked={isAccepted}
            label={t('common.disclaimer.checkbox')}
            onChange={setIsAccepted}
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <div>
          <LanguageToggle />
        </div>

        <Button className="ml-auto" disabled={!isAccepted} onClick={handleClose}>
          {t('common.actions.continue')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DisclaimerModal
