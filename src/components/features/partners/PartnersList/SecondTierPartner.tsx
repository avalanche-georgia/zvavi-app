import { Drawer } from '@components/ui'
import type { Partner } from '@data/constants/partners'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const PartnerButton = ({ logo, name }: { name: Partner['name']; logo: Partner['logo'] }) => (
  <>
    <div className="flex size-24 flex-none items-center justify-center overflow-hidden rounded-xl">
      <PartnerLogo
        className="size-full"
        imageSize={{ height: 96, width: 96 }}
        logo={logo}
        name={name}
      />
    </div>

    <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
  </>
)

const SecondTierPartner = ({ partner }: { partner: Partner }) => {
  const { infoKey, logo, name, url } = partner
  const hasInfo = Boolean(infoKey)

  const badgeClassName = 'flex items-center gap-2 rounded-xl bg-gray-100 p-3'

  if (!hasInfo) {
    return (
      <a className={badgeClassName} href={url} rel="noopener noreferrer" target="_blank">
        <PartnerButton logo={logo} name={name} />
      </a>
    )
  }

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className={badgeClassName} type="button">
        <PartnerButton logo={logo} name={name} />
      </button>
    </Drawer>
  )
}

export default SecondTierPartner
