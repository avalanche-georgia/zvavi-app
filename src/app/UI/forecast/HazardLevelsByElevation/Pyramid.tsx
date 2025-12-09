import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { hazardLevelNamesByScale } from '@/business/constants'
import { backgroundColorByHazardLevel } from '@/UI/constants'

import type { HazardLevels as HazardLevelsType } from '@/business/types'

const Pyramid = ({ hazardLevels }: { hazardLevels: HazardLevelsType }) => {
  const { alpine, highAlpine, subAlpine } = hazardLevels
  const t = useTranslations()

  const elevationZones = [
    {
      height: 'h-20',
      id: 'highAlpine',
      leftClip: 'polygon(100% -3px, 100% 100%, 0 100%)',
      leftWidth: 'w-9',
      rightClip: 'polygon(1px 0%, 100% 44%, 100% 100%, 0px 100%)',
      zone: highAlpine,
    },
    {
      height: 'h-[59px]',
      id: 'alpine',
      leftClip: 'polygon(40% 0px, 100% 0 , 100% 100%, 0px 100%)',
      leftWidth: 'w-[63px]',
      rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
      zone: alpine,
    },
    {
      height: 'h-[60px]',
      id: 'subAlpine',
      leftClip: 'polygon(29% 0px, 100% 0px, 100% 100%, 0px 100%)',
      leftWidth: 'w-[91px]',
      rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
      zone: subAlpine,
    },
  ]

  return (
    <div className="absolute bottom-0 right-0 flex flex-col items-end gap-[5px] pb-[18px]">
      {elevationZones.map(({ height, id, leftClip, leftWidth, rightClip, zone }) => (
        <div key={id} className={clsx('flex', height)}>
          <div
            className={clsx(leftWidth, backgroundColorByHazardLevel[zone])}
            style={{ clipPath: leftClip }}
          />
          <div
            className={clsx(
              '-mx-px flex w-[97px] items-end justify-center pb-4',
              backgroundColorByHazardLevel[zone],
            )}
          >
            <p className="rounded bg-white px-2 py-1 text-xs">{t(hazardLevelNamesByScale[zone])}</p>
          </div>
          <div
            className={clsx('w-4', backgroundColorByHazardLevel[zone])}
            style={{ clipPath: rightClip }}
          />
        </div>
      ))}
    </div>
  )
}

export default Pyramid
