import { useState } from 'react'

// Which panel is open. Panels never stack: opening one replaces the other.
export type AvalancheSheetState =
  | { mode: 'create' }
  | { mode: 'pick' }
  | { id: number; mode: 'edit' | 'view' }
  | null

const useAvalancheSheets = () => {
  const [sheet, setSheet] = useState<AvalancheSheetState>(null)

  return {
    close: () => setSheet(null),
    openCreate: () => setSheet({ mode: 'create' }),
    openEdit: (id: number) => setSheet({ id, mode: 'edit' }),
    openPicker: () => setSheet({ mode: 'pick' }),
    openView: (id: number) => setSheet({ id, mode: 'view' }),
    sheet,
  }
}

export default useAvalancheSheets
