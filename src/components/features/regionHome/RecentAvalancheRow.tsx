import { SizeTile, useCardDateLabel } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

type RecentAvalancheRowProps = {
  avalanche: PublicObservation
  onOpen: VoidFunction
}

// Size tile, "Wind slab · skier triggered", then where · when · who.
// Opens the observation's sheet.
const RecentAvalancheRow = ({ avalanche, onOpen }: RecentAvalancheRowProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const getDateLabel = useCardDateLabel()
  const { aspects, size, submitterName, trigger, type } = avalanche

  const details = [getSummary(aspects), getDateLabel(avalanche, 'occurred'), submitterName]

  return (
    <button
      aria-haspopup="dialog"
      className="group focus-ring text-ink grid w-full grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-sm py-2.5 text-left"
      onClick={onOpen}
      type="button"
    >
      <SizeTile size={size} />
      <span className="min-w-0">
        <b className="text-copy block font-semibold underline-offset-3 group-hover:underline">
          {t(`common.avalancheTypes.${type}`)} · {t(`common.avalancheTriggers.${trigger}`)}
        </b>
        <span className="text-muted text-caption mt-0.5 block">
          {details.filter(Boolean).join(' · ')}
        </span>
      </span>
    </button>
  )
}

export default RecentAvalancheRow
