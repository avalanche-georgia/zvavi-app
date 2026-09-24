'use client'

import { useId } from 'react'
import { Sheet } from '@components/ui'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheSheetBody from './AvalancheSheetBody'
import AvalancheSheetFooter from './AvalancheSheetFooter'
import AvalancheSheetHeader from './AvalancheSheetHeader'
import type { AvalancheSheetMode, AvalancheSheetNavigation } from './types'
import useAvalancheSheet from './useAvalancheSheet'
import useAvalancheSheetActions from './useAvalancheSheetActions'

type AvalancheSheetProps = {
  id: number | null
  initialMode: AvalancheSheetMode
  // Prev / next through the list behind the panel
  navigation?: AvalancheSheetNavigation
  onClose: VoidFunction
  // Moderation queue: the record left it (approved / rejected / deleted) —
  // moves on to a neighbour instead of closing
  onRecordLeave?: VoidFunction
  onReopen: (id: number) => void
  regionId?: RegionId
}

// One record of the catalog or the moderation queue, viewed and edited in place
const AvalancheSheet = ({
  id,
  initialMode,
  navigation,
  onClose,
  onRecordLeave,
  onReopen,
  regionId,
}: AvalancheSheetProps) => {
  const t = useTranslations()
  const formId = useId()
  const sheet = useAvalancheSheet({ id, initialMode, onReopen, regionId })
  const { avalanche, confirm, hasUnsavedEdits, mode, setConfirm, setMode, showView } = sheet

  const { handleConfirm, handleEditCancel, handleKeyDown, handleOpenChange, isDeleting } =
    useAvalancheSheetActions({ ...sheet, id, navigation, onClose, onRecordLeave })

  return (
    <Sheet
      className={mode === 'edit' ? 'lg:w-200' : undefined}
      footer={
        avalanche && (
          <AvalancheSheetFooter
            avalanche={avalanche}
            confirm={confirm}
            formId={formId}
            isDeleting={isDeleting}
            isSaving={sheet.isSaving}
            mode={mode}
            onConfirm={handleConfirm}
            onConfirmCancel={() => setConfirm(null)}
            onDelete={() => setConfirm('delete')}
            onEdit={() => setMode('edit')}
            onEditCancel={handleEditCancel}
          />
        )
      }
      header={
        <AvalancheSheetHeader
          fullPageId={mode === 'view' && avalanche ? avalanche.id : null}
          navigation={mode === 'view' && !isDeleting ? (navigation ?? null) : null}
          title={avalanche ? t(`common.avalancheTypes.${avalanche.type}`) : ''}
        />
      }
      isDismissible={!hasUnsavedEdits}
      // Stays open while edits are unsaved, even if the URL lost the record
      isOpen={id !== null || hasUnsavedEdits}
      isTall
      onKeyDown={handleKeyDown}
      onOpenChange={handleOpenChange}
    >
      <AvalancheSheetBody
        avalanche={avalanche}
        formId={formId}
        isError={sheet.isError}
        isPending={sheet.isPending}
        mode={mode}
        onDirtyChange={sheet.setIsDirty}
        onEditCancel={handleEditCancel}
        onRetry={sheet.onRetry}
        onSaved={showView}
        onSubmittingChange={sheet.setIsSaving}
      />
    </Sheet>
  )
}

export default AvalancheSheet
