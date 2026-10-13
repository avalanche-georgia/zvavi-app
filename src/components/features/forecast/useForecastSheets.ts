import { useState } from 'react'
import type { Problem } from '@domain/types'

import type { InfoTopic, ProblemField } from './InfoSheet'
import { getProblemKey } from './model/problemKey'

// Which sheets are open: a problem, and an explanation — of the danger level
// on its own, or of a problem property stacked over the problem.
// The open problem is remembered by identity, not position: the forecast
// refreshes in the background and its problems may be reordered or removed.
const useForecastSheets = (problems: Problem[]) => {
  const [openProblemKey, setOpenProblemKey] = useState<string | null>(null)
  const [infoTopic, setInfoTopic] = useState<InfoTopic | null>(null)

  const foundIndex = problems.findIndex((problem) => getProblemKey(problem) === openProblemKey)
  // A problem that is gone closes its sheet
  const openProblemIndex = foundIndex === -1 ? null : foundIndex

  const closeAll = () => {
    setInfoTopic(null)
    setOpenProblemKey(null)
  }

  const openProblem = (index: number) => {
    const problem = problems[index]

    if (!problem) return

    setInfoTopic(null)
    setOpenProblemKey(getProblemKey(problem))
  }

  return {
    closeAll,
    closeInfo: () => setInfoTopic(null),
    isDangerInfoOpen: infoTopic === 'danger',
    openDangerInfo: () => setInfoTopic('danger'),
    openProblem,
    openProblemIndex,
    problemInfoField: infoTopic === 'danger' || openProblemIndex === null ? null : infoTopic,
    setProblemInfoField: (field: ProblemField | null) => setInfoTopic(field),
  }
}

export default useForecastSheets
