import { useCallback, useMemo, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, Spinner } from '@components/ui'
import { useAllRecentAvalanchesQuery } from '@data/hooks/forecasts'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalanchePickerRow from './AvalanchePickerRow'

type AvalanchePickerModalProps = {
  currentForecastId: number | undefined
  isOpen: boolean
  onClose: () => void
  onConfirm: (selected: Avalanche[]) => void
}

const AvalanchePickerModal = ({
  currentForecastId,
  isOpen,
  onClose,
  onConfirm,
}: AvalanchePickerModalProps) => {
  const t = useTranslations()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const { data: avalanches = [], isLoading } = useAllRecentAvalanchesQuery({ enabled: isOpen })

  const availableAvalanches = useMemo(
    () =>
      avalanches.filter(
        (avalanche) =>
          !currentForecastId ||
          !avalanche.forecastAvalanche.some((fa) => fa.forecastId === currentForecastId),
      ),
    [avalanches, currentForecastId],
  )

  const handleToggle = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }, [])

  const handleConfirm = useCallback(() => {
    const selected = availableAvalanches
      .filter((avalanche) => selectedIds.has(avalanche.id))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ forecastAvalanche, ...rest }) => rest as Avalanche)

    onConfirm(selected)
    setSelectedIds(new Set())
  }, [availableAvalanches, onConfirm, selectedIds])

  const handleClose = useCallback(() => {
    setSelectedIds(new Set())
    onClose()
  }, [onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('admin.forecast.form.recentAvalanches.labels.pickAvalanches')}
    >
      <ModalBody>
        {isLoading ? (
          <Spinner />
        ) : availableAvalanches.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            {t('admin.forecast.form.recentAvalanches.labels.noAvalanchesInDB')}
          </p>
        ) : (
          <ul className="max-h-[60vh] divide-y overflow-y-auto">
            {availableAvalanches.map((avalanche) => (
              <AvalanchePickerRow
                key={avalanche.id}
                avalanche={avalanche}
                isSelected={selectedIds.has(avalanche.id)}
                onToggle={handleToggle}
              />
            ))}
          </ul>
        )}
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleClose} variant="secondary">
          {t('common.actions.cancel')}
        </Button>
        <Button disabled={selectedIds.size === 0} onClick={handleConfirm}>
          {t('admin.forecast.form.recentAvalanches.labels.addSelected', {
            count: selectedIds.size,
          })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AvalanchePickerModal
