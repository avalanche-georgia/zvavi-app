import { useState } from 'react'
import type { ElevationKey, FullForecast } from '@domain/types'

import type { ProblemField } from './InfoSheet'
import { getProblemKey } from './model/problemKey'

type OpenItem = { key: string; kind: 'avalanche' | 'problem' }

// Which sheets are open: a problem or an avalanche record, an explanation of a
// problem property stacked over the problem, and the danger-level explanation.
// The open item is remembered by identity, not position: the forecast
// refreshes in the background and its lists may be reordered or shortened.
const useForecastSheets = ({ avalancheProblems, recentAvalanches }: FullForecast) => {
  const [openItem, setOpenItem] = useState<OpenItem | null>(null)
  const [problemInfoField, setProblemInfoField] = useState<ProblemField | null>(null)
  // The scope stays while the sheet animates closed
  const [dangerInfo, setDangerInfo] = useState<{ isOpen: boolean; scope: ElevationKey }>({
    isOpen: false,
    scope: 'overall',
  })

  const findIndex = (kind: OpenItem['kind'], keys: string[]) => {
    const index = openItem?.kind === kind ? keys.indexOf(openItem.key) : -1

    // An item that is gone closes its sheet
    return index === -1 ? null : index
  }

  const problemKeys = avalancheProblems.map(getProblemKey)
  const avalancheKeys = recentAvalanches.map((avalanche) => String(avalanche.id))
  const openProblemIndex = findIndex('problem', problemKeys)
  const openAvalancheIndex = findIndex('avalanche', avalancheKeys)

  // Forget an item that left the forecast — or its sheet would reopen by
  // itself if the item came back in a later refresh
  if (openItem && openProblemIndex === null && openAvalancheIndex === null) setOpenItem(null)

  const open = (kind: OpenItem['kind'], key: string | undefined) => {
    if (key === undefined) return

    setProblemInfoField(null)
    setOpenItem({ key, kind })
  }

  return {
    close: () => {
      setProblemInfoField(null)
      setOpenItem(null)
    },
    closeDangerInfo: () => setDangerInfo((current) => ({ ...current, isOpen: false })),
    dangerInfo,
    openAvalanche: (index: number) => open('avalanche', avalancheKeys[index]),
    openAvalancheIndex,
    openDangerInfo: (scope: ElevationKey) => setDangerInfo({ isOpen: true, scope }),
    openProblem: (index: number) => open('problem', problemKeys[index]),
    openProblemIndex,
    problemInfoField: openProblemIndex === null ? null : problemInfoField,
    setProblemInfoField,
  }
}

export default useForecastSheets
