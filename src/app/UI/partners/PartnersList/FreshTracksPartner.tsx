import Image from 'next/image'

import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'
import PartnerInfo from './PartnerInfo'

const FreshTracksPartner = ({ partner }: { partner: Partner }) => {
  const { logo, name } = partner

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className="flex items-center gap-2 rounded-xl bg-gray-100 p-3" type="button">
        <div className="flex h-24 flex-none items-center justify-center overflow-hidden rounded-xl">
          <Image alt={`${name} logo`} className="object-contain" src={logo} width={96} />
        </div>

        <h4 className=" text-lg font-semibold text-gray-900">{name}</h4>
      </button>
    </Drawer>
  )
}

export default FreshTracksPartner
