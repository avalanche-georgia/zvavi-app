import { useCallback, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, Spinner } from '@components/ui'
import { useAllRecentAvalanchesQuery } from '@data/hooks/forecasts'
import type { Avalanche, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalanchePickerRow from './AvalanchePickerRow'

type AvalanchePickerModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (selected: Avalanche[]) => void
  regionId: RegionId
  selectedAvalancheIds: number[]
}

const AvalanchePickerModal = ({
  isOpen,
  onClose,
  onConfirm,
  regionId,
  selectedAvalancheIds,
}: AvalanchePickerModalProps) => {
  const t = useTranslations()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set(selectedAvalancheIds))

  const { data: avalanches = [], isLoading } = useAllRecentAvalanchesQuery({
    enabled: isOpen,
    regionId,
  })

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
    const selected = avalanches
      .filter((avalanche) => selectedIds.has(avalanche.id))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ forecastAvalanche, ...rest }) => rest as Avalanche)

    onConfirm(selected)
  }, [avalanches, onConfirm, selectedIds])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('admin.forecast.form.recentAvalanches.labels.pickAvalanches')}
    >
      <ModalBody>
        {isLoading ? (
          <Spinner />
        ) : avalanches.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            {t('admin.forecast.form.recentAvalanches.labels.noAvalanchesInDB')}
          </p>
        ) : (
          <ul className="max-h-[60vh] divide-y overflow-y-auto">
            {avalanches.map((avalanche) => (
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
        <Button onClick={onClose} variant="secondary">
          {t('common.actions.cancel')}
        </Button>
        <Button onClick={handleConfirm}>
          {t('admin.forecast.form.recentAvalanches.labels.addSelected', {
            count: selectedIds.size,
          })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AvalanchePickerModal
