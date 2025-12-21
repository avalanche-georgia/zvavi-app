import type { ModalProps } from '@components/ui/Modal'
import { Modal } from '@components/ui/Modal'
import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import { ForecastForm, getInitialFormData } from './ForecastForm'

type ForecastModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
  forecast: FullForecast | null
}

const ForecastModal = ({ forecast, isOpen, onClose }: ForecastModalProps) => {
  const t = useTranslations()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t(`admin.forecast.title.${forecast ? 'edit' : 'create'}`)}
    >
      <ForecastForm initialFormData={getInitialFormData(forecast)} onClose={onClose} />
    </Modal>
  )
}

export default ForecastModal
