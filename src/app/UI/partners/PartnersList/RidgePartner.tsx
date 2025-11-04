import Image from 'next/image'

import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'

import PartnerInfo from '@/UI/home/Partners/PartnerInfo'

const RidgePartner = ({ partner }: { partner: Partner }) => {
  const { logo, name } = partner

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button className="flex items-center gap-2 rounded-xl bg-gray-100 p-3" type="button">
        <div className="size-20 flex-none">
          <Image alt={`${name} logo`} className="w-full" src={logo} />
        </div>

        <h4 className=" text-lg font-semibold text-gray-900">{name}</h4>
      </button>
    </Drawer>
  )
}

export default RidgePartner
