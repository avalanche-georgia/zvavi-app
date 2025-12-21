import { Drawer } from '@components/ui'
import type { Partner } from '@data/constants/partners'
import clsx from 'clsx'

import PartnerInfo from './PartnerInfo'
import PartnerLogo from './PartnerLogo'

const FirstTierPartner = ({ partner }: { partner: Partner }) => {
  const { isRounded, logo, name } = partner

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button
        className="flex w-full flex-col items-center gap-4 rounded-2xl bg-primary/10 p-4"
        type="button"
      >
        <div
          className={clsx(
            'inline-flex h-[100px] max-w-[200px] items-center justify-center',
            isRounded && 'overflow-hidden rounded-xl',
          )}
        >
          <PartnerLogo
            className="size-full max-w-[200px]"
            imageSize={{ height: 100 }}
            logo={logo}
            name={name}
          />
        </div>
        <h3 className="text-center text-xl font-semibold text-gray-900">{name}</h3>
      </button>
    </Drawer>
  )
}

export default FirstTierPartner
