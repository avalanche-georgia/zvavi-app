import { SizeTile, useRelativeDate } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

const DetailTitle = ({ observation }: { observation: PublicObservation }) => {
  const t = useTranslations()
  const formatRelativeDate = useRelativeDate()
  const { createdAt, date, isDateUnknown, size, type } = observation

  const reported = formatRelativeDate(createdAt)
  const subtitle =
    isDateUnknown || !date
      ? t('observations.detail.dateUnknownReported', { reported })
      : t('observations.detail.occurredReported', {
          occurred: formatRelativeDate(date),
          reported,
        })

  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-1">
      <SizeTile className="size-14" size={size} />
      <div>
        <h2 className="m-0 text-[21px] leading-[1.15] font-bold tracking-[-.02em]">
          {t(`common.avalancheTypes.${type}`)}
        </h2>
        <p className="text-muted mt-0.75 text-[13.5px]">{subtitle}</p>
      </div>
    </div>
  )
}

export default DetailTitle
