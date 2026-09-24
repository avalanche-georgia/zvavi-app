import { useTranslations } from 'next-intl'

import DetailSection from './DetailSection'

// Name only (already shortened by the API) — contact and training are never public
const DetailReporter = ({ name }: { name: string }) => {
  const t = useTranslations()

  if (!name) return null

  return (
    <DetailSection title={t('observations.detail.reportedBy')}>
      <div className="flex items-center gap-3">
        <div className="bg-primary-soft text-primary-ink grid size-10 place-items-center rounded-full font-bold">
          {Array.from(name)[0].toLocaleUpperCase()}
        </div>
        <b className="text-[15px]">{name}</b>
      </div>
    </DetailSection>
  )
}

export default DetailReporter
