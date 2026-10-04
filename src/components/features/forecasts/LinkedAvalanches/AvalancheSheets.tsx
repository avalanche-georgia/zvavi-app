'use client'

import { AvalancheCreateSheet, AvalancheSheet } from '@components/features/admin/RecentAvalanches'
import { formatAvalancheId } from '@components/features/observations'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import { AvalanchePickerSheet } from './AvalanchePickerSheet'
import SheetNote from './SheetNote'
import type { AvalancheSheetState } from './useAvalancheSheets'

type AvalancheSheetsProps = {
  avalanches: LinkableAvalanche[]
  catalogName: string
  isPending: boolean
  linkedIds: number[]
  onClose: VoidFunction
  onDeleted: (id: number) => void
  onLink: (ids: number[]) => void
  onReopen: (id: number) => void
  regionId: RegionId
  sheet: AvalancheSheetState
}

// The record panels the section opens: picker, the shared record panel
// (view / edit) and the create panel
const AvalancheSheets = (props: AvalancheSheetsProps) => {
  const {
    avalanches,
    catalogName,
    isPending,
    linkedIds,
    onClose,
    onDeleted,
    onLink,
    onReopen,
    regionId,
    sheet,
  } = props
  const t = useTranslations()
  const key = 'admin.forecast.editor.avalanches.sheet'
  const recordId = sheet && 'id' in sheet ? sheet.id : null
  const record = avalanches.find((avalanche) => avalanche.id === recordId)

  const handleLinkPicked = (ids: number[]) => {
    onLink(ids)
    onClose()
  }

  const handleCreated = (id: number) => onLink([id])

  return (
    <>
      <AvalanchePickerSheet
        avalanches={avalanches}
        catalogName={catalogName}
        isOpen={sheet?.mode === 'pick'}
        isPending={isPending}
        linkedIds={linkedIds}
        onClose={onClose}
        onLink={handleLinkPicked}
      />
      <AvalancheSheet
        editNote={
          recordId !== null && (
            <SheetNote tone="info">
              {t.rich(`${key}.editNote`, {
                count: record?.forecastAvalanche.length ?? 0,
                id: formatAvalancheId(recordId),

                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </SheetNote>
          )
        }
        editSaveLabel={t(`${key}.saveRecord`)}
        id={recordId}
        initialMode={sheet?.mode === 'edit' ? 'edit' : 'view'}
        onClose={onClose}
        onDeleted={onDeleted}
        onReopen={onReopen}
        regionId={regionId}
      />
      <AvalancheCreateSheet
        isRequested={sheet?.mode === 'create'}
        note={
          <SheetNote tone="success">
            {t.rich(`${key}.createNote`, {
              catalog: catalogName,

              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </SheetNote>
        }
        onClose={onClose}
        onCreated={handleCreated}
        regionId={regionId}
        submitLabel={t(`${key}.createAndLink`)}
        title={t(`${key}.createTitle`)}
      />
    </>
  )
}

export default AvalancheSheets
