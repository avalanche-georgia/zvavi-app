import clsx from 'clsx'

import type { Partner } from '@/data/constants/partners'

import { Drawer } from '@/UI/components'

import { PartnerInfo, PartnerLogo } from '@/UI/partners/PartnersList'

const MainPartnerCard = ({ partner }: { partner: Partner }) => {
  const { isRounded, logo, name } = partner

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button
        className="flex h-36 w-64 flex-col items-center gap-3 rounded-2xl bg-primary/10 px-8 py-3"
        type="button"
      >
        <div
          className={clsx(
            'inline-flex h-[120px] max-w-[200px] items-center justify-center',
            isRounded && 'overflow-hidden rounded-xl',
          )}
        >
          <PartnerLogo className="size-full" imageSize={{ height: 120 }} logo={logo} name={name} />
        </div>
      </button>
    </Drawer>
  )
}

export default MainPartnerCard
