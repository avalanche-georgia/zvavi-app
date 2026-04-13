import { useCallback } from 'react'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheItem from './AvalancheItem'
import type { FormState } from '../../common'
import { AvalancheForm, type AvalancheFormProps } from '../AvalancheForm'

type AvalancheWithLocalId = Avalanche & { localId: string }

type AvalanchesListProps = {
  avalanches: AvalancheWithLocalId[]
  formState: FormState
  onDelete: (localId: string) => void
  onFormClose: AvalancheFormProps['onClose']
  onFormOpen: (state: { mode: 'edit'; localId: string }) => void
  onFormSave: AvalancheFormProps['onSave']
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
            <AvalancheForm avalancheData={avalanche} onClose={onFormClose} onSave={onFormSave} />
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
