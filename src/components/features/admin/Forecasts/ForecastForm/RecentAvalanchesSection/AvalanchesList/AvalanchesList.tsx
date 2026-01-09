import { useCallback } from 'react'
import type { Avalanche } from '@domain/types'
import _uniqueId from 'lodash/uniqueId'
import { useTranslations } from 'next-intl'

import AvalancheItem from './AvalancheItem'
import type { FormState } from '../../common'
import { AvalancheForm, type AvalancheFormProps } from '../AvalancheForm'

type AvalanchesListProps = {
  avalanches: Avalanche[]
  formState: FormState
  onDelete: (avalanches: Avalanche[]) => void
  onFormClose: AvalancheFormProps['onClose']
  onFormOpen: (state: { mode: 'edit'; id: string }) => void
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
    (id: string) => {
      onFormOpen({ id, mode: 'edit' })
    },
    [onFormOpen],
  )

  const handleDelete = useCallback(
    (id: string) => {
      onDelete(avalanches.filter((el) => el.id !== id))
    },
    [onDelete, avalanches],
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
        <li key={_uniqueId('avalanche-')}>
          {formState?.mode === 'edit' && formState.id === avalanche.id ? (
            <AvalancheForm avalancheData={avalanche} onClose={onFormClose} onSave={onFormSave} />
          ) : (
            <AvalancheItem
              avalanche={avalanche}
              canEdit={formState === null}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default AvalanchesList
