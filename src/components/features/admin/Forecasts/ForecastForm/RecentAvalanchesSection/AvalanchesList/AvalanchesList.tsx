import { useCallback } from 'react'
import type { Avalanche, AvalancheFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheItem from './AvalancheItem'
import type { AvalancheFormState } from '../../common'
import { AvalancheForm } from '../AvalancheForm'

type AvalancheWithLocalId = Omit<Avalanche, 'regionId'> & { localId: string }

const toFormData = ({ date, ...rest }: AvalancheWithLocalId): AvalancheFormData => ({
  ...rest,
  date: date instanceof Date ? date : date ? new Date(date) : null,
})

type AvalanchesListProps = {
  avalanches: AvalancheWithLocalId[]
  formState: AvalancheFormState
  onDelete: (localId: string) => void
  onFormClose: VoidFunction
  onFormOpen: (state: { mode: 'edit'; localId: string }) => void
  onFormSave: (data: Omit<Avalanche, 'regionId'>) => void
}

const AvalanchesList = ({
  avalanches,
  formState,
  onDelete,
  onFormClose,
  onFormOpen,
  onFormSave,
}: AvalanchesListProps) => {
  const t = useTranslations()

  const handleEdit = useCallback(
    (localId: string) => {
      onFormOpen({ localId, mode: 'edit' })
    },
    [onFormOpen],
  )

  if (avalanches.length === 0 && formState === null) {
    return (
      <p className="text-center text-gray-500">
        {t('admin.forecast.form.recentAvalanches.noAvalanches')}
      </p>
    )
  }

  return (
    <ul className="space-y-4">
      {avalanches.map((avalanche) => (
        <li key={avalanche.localId}>
          {formState?.mode === 'edit' && formState.localId === avalanche.localId ? (
            <AvalancheForm
              avalancheData={toFormData(avalanche)}
              onClose={onFormClose}
              onSave={onFormSave}
            />
          ) : (
            <AvalancheItem
              avalanche={avalanche}
              canEdit={formState === null}
              onDelete={onDelete}
              onEdit={handleEdit}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default AvalanchesList
