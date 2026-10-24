import { Loading } from '@components/features/admin/shared'
import { LoadError } from '@components/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import type { AvalancheSheetMode } from './types'
import { AvalancheView } from '../AvalancheView'
import { RecentAvalancheForm } from '../RecentAvalancheForm'

type AvalancheSheetBodyProps = {
  avalanche: AvalancheListItem | null
  editNote?: React.ReactNode
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
  editNote,
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
    return <Loading />
  }

  // A failed load isn't "not found" — the record may well exist
  if (isError && !avalanche) return <LoadError onRetry={onRetry} />

  if (!avalanche) {
    return (
      <p className="text-muted text-copy px-4 py-12 text-center">
        {t('admin.recentAvalanches.notFound')}
      </p>
    )
  }

  if (mode === 'view') {
    return <AvalancheView avalanche={avalanche} />
  }

  return (
    <>
      {editNote}
      <RecentAvalancheForm
        avalanche={avalanche}
        formId={formId}
        onCancel={onEditCancel}
        onDirtyChange={onDirtyChange}
        onSubmittingChange={onSubmittingChange}
        onSuccess={onSaved}
        regionId={avalanche.regionId}
        variant="panel"
      />
    </>
  )
}

export default AvalancheSheetBody
