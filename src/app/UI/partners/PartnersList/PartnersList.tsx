import classnames from 'classnames'
import { useTranslations } from 'next-intl'

import { type Partner, type PartnerLevel, partners } from '@/data/constants/partners'

import PartnerBadge from './PartnerBadge'
import SnowBasePartner from './SnowBasePartner'
import SummitPartner from './SummitPartner'

const CardRendererByLevel: Record<PartnerLevel, React.ComponentType<{ partner: Partner }>> = {
  freshTracks: PartnerBadge,
  snowBase: SnowBasePartner,
  summit: SummitPartner,
}

const PartnersList = ({ level }: { level: PartnerLevel }) => {
  const t = useTranslations()
  const PartnerComponent = CardRendererByLevel[level]
  const filteredPartners = partners[level].filter((partner) => !partner.isHidden)

  if (filteredPartners.length === 0) return null

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">{t(`partners.levels.${level}`)}</h2>
      <ul className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {filteredPartners.map((partner) => (
          <li
            key={partner.id}
            className={classnames(
              'flex-none',
              level === 'summit' &&
                (filteredPartners.length === 1 ? 'w-full' : 'w-[calc(100%-32px)]'),
            )}
          >
            <PartnerComponent partner={partner} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PartnersList
