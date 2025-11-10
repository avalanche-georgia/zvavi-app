import Image from 'next/image'

import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'
import PartnerInfo from './PartnerInfo'

const SummitPartner = ({ partner }: { partner: Partner }) => {
  const { logo, name } = partner

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button
        className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl bg-primary/10 p-4"
        type="button"
      >
        <div className="flex h-[100px] items-center justify-center">
          <Image alt={`${name} logo`} className="h-full object-contain" src={logo} />
        </div>
        <h3 className="text-center text-2xl font-semibold text-gray-900">{name}</h3>
      </button>
    </Drawer>
  )
}

export default SummitPartner
