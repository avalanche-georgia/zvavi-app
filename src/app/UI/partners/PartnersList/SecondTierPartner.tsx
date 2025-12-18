import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'
import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const SecondTierPartner = ({ partner }: { partner: Partner }) => {
  const { logo, name } = partner

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className="flex items-center gap-2 rounded-xl bg-gray-100 p-3" type="button">
        <div className="flex size-24 flex-none items-center justify-center overflow-hidden rounded-xl">
          <PartnerLogo
            className="size-full"
            imageSize={{ height: 96, width: 96 }}
            logo={logo}
            name={name}
          />
        </div>

        <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
      </button>
    </Drawer>
  )
}

export default SecondTierPartner
