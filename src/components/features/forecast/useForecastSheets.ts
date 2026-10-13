import { useState } from 'react'

import type { InfoTopic, ProblemField } from './InfoSheet'

// Which sheets are open: a problem (by position), and an explanation — of the
// danger level on its own, or of a problem property stacked over the problem
const useForecastSheets = () => {
  const [openProblemIndex, setOpenProblemIndex] = useState<number | null>(null)
  const [infoTopic, setInfoTopic] = useState<InfoTopic | null>(null)

  const closeAll = () => {
    setInfoTopic(null)
    setOpenProblemIndex(null)
  }

  return {
    closeAll,
    closeInfo: () => setInfoTopic(null),
    isDangerInfoOpen: infoTopic === 'danger',
    openDangerInfo: () => setInfoTopic('danger'),
    openProblem: (index: number) => {
      setInfoTopic(null)
      setOpenProblemIndex(index)
    },
    openProblemIndex,
    problemInfoField: infoTopic === 'danger' ? null : infoTopic,
    setProblemInfoField: (field: ProblemField | null) => setInfoTopic(field),
  }
}

export default useForecastSheets
