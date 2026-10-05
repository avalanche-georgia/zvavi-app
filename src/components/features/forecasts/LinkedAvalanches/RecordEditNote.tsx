'use client'

import { formatAvalancheId } from '@components/features/observations'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import SheetNote from './SheetNote'

type RecordEditNoteProps = {
  id: number
  record: LinkableAvalanche | undefined
}

// Shown above the record's edit form: edits reach every forecast linking it
const RecordEditNote = ({ id, record }: RecordEditNoteProps) => {
  const t = useTranslations()

  return (
    <SheetNote tone="info">
      {t.rich('admin.forecast.editor.avalanches.sheet.editNote', {
        count: record?.forecastAvalanche.length ?? 0,
        id: formatAvalancheId(id),

        strong: (chunks) => <strong>{chunks}</strong>,
      })}
    </SheetNote>
  )
}

export default RecordEditNote
