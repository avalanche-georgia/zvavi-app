import { problemIcons } from '@components/constants'
import { useAspectSummary } from '@components/hooks'
import type { Problem } from '@domain/types'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ProblemTiles from './ProblemTiles'
import type { ProblemField } from '../InfoSheet'
import Prose from '../sections/Prose'

type ProblemBodyProps = {
  onInfoOpen: (field: ProblemField) => void
  problem: Problem
}

// Icon + name + where, the forecaster's description, then the property tiles
const ProblemBody = ({ onInfoOpen, problem }: ProblemBodyProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { aspects, description, type } = problem
  const aspectSummary = getSummary(aspects)

  return (
    <div className="pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-3 px-4 pt-4">
        <Image
          alt=""
          className="rounded-media size-14 shrink-0"
          height={56}
          src={problemIcons[type]}
          width={56}
        />
        <div className="min-w-0">
          <h2 className="text-ink text-title-sm m-0 font-bold">
            {t(`common.avalancheTypes.${type}`)}
          </h2>
          {aspectSummary && <p className="text-muted text-copy-sm mt-0.5">{aspectSummary}</p>}
        </div>
      </div>
      {description && (
        <Prose className="text-copy-lg leading-prose mx-4 mt-3.5" content={description} />
      )}
      <ProblemTiles onInfoOpen={onInfoOpen} problem={problem} />
    </div>
  )
}

export default ProblemBody
