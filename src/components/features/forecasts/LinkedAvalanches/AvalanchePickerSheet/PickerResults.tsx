import { Spinner } from '@components/ui'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import PickerRow from './PickerRow'

type PickerResultsProps = {
  avalanches: LinkableAvalanche[]
  isPending: boolean
  linkedIds: number[]
  onToggle: (id: number) => void
  selectedIds: number[]
}

const PickerResults = ({
  avalanches,
  isPending,
  linkedIds,
  onToggle,
  selectedIds,
}: PickerResultsProps) => {
  const t = useTranslations()

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (avalanches.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-copy text-ink font-semibold">
          {t('admin.forecast.editor.avalanches.picker.emptyTitle')}
        </p>
        <p className="text-copy-sm text-muted">
          {t('admin.forecast.editor.avalanches.picker.emptyText')}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0.5 px-2 pb-3">
      {avalanches.map((avalanche) => (
        <PickerRow
          key={avalanche.id}
          avalanche={avalanche}
          isLinked={linkedIds.includes(avalanche.id)}
          isSelected={selectedIds.includes(avalanche.id)}
          onToggle={() => onToggle(avalanche.id)}
        />
      ))}
    </div>
  )
}

export default PickerResults
