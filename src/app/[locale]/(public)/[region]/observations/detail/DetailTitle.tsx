import { SizeTile } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

// Size + type. Dates live in the facts grid right below.
const DetailTitle = ({ observation }: { observation: PublicObservation }) => {
  const t = useTranslations()
  const { size, type } = observation

  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-1">
      <SizeTile className="size-14" size={size} />
      <h2 className="m-0 text-[21px] leading-[1.15] font-bold tracking-[-.02em]">
        {t(`common.avalancheTypes.${type}`)}
      </h2>
    </div>
  )
}

export default DetailTitle
