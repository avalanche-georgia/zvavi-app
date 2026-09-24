import { Spinner } from '@components/ui'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import LoadError from './LoadError'
import type { AvalancheSheetMode } from './types'
import { AvalancheView } from '../AvalancheView'
import { RecentAvalancheForm } from '../RecentAvalancheForm'

type AvalancheSheetBodyProps = {
  avalanche: AvalancheListItem | null
  formId: string
  isError: boolean
  isPending: boolean
  mode: AvalancheSheetMode
  onDirtyChange: (isDirty: boolean) => void
  onEditCancel: VoidFunction
  onRetry: VoidFunction
  onSaved: VoidFunction
  onSubmittingChange: (isSubmitting: boolean) => void
}

const AvalancheSheetBody = ({
  avalanche,
  formId,
  isError,
  isPending,
  mode,
  onDirtyChange,
  onEditCancel,
  onRetry,
  onSaved,
  onSubmittingChange,
}: AvalancheSheetBodyProps) => {
  const t = useTranslations()

  if (isPending) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  // A failed load isn't "not found" — the record may well exist
  if (isError && !avalanche) return <LoadError onRetry={onRetry} />

  if (!avalanche) {
    return (
      <p className="text-muted px-4 py-12 text-center text-sm">
        {t('admin.recentAvalanches.notFound')}
      </p>
    )
  }

  if (mode === 'view') return <AvalancheView avalanche={avalanche} />

  return (
    <RecentAvalancheForm
      avalanche={avalanche}
      formId={formId}
      mode="edit"
      onCancel={onEditCancel}
      onDirtyChange={onDirtyChange}
      onSubmittingChange={onSubmittingChange}
      onSuccess={onSaved}
      regionId={avalanche.regionId}
      variant="panel"
    />
  )
}

export default AvalancheSheetBody
