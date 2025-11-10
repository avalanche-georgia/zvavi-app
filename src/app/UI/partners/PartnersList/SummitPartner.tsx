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
        <div className="flex items-center justify-center overflow-hidden rounded-xl">
          <Image alt={`${name} logo`} className="object-contain" height={100} src={logo} />
        </div>
        <h3 className="text-center text-xl font-semibold text-gray-900">{name}</h3>
      </button>
    </Drawer>
  )
}

export default SummitPartner
