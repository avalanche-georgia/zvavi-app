'use client'

import { useState } from 'react'
import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevels as HazardLevelsType, HazardLevelScale } from '@domain/types'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import HazardLevelInfoDrawer from './HazardLevelInfoDrawer'

type SelectedZone = { level: HazardLevelScale; zoneLabel: string }

const Pyramid = ({ hazardLevels }: { hazardLevels: HazardLevelsType }) => {
  const { alpine, highAlpine, subAlpine } = hazardLevels
  const t = useTranslations()
  const [selected, setSelected] = useState<SelectedZone | null>(null)

  const elevationZones = [
    {
      height: 'h-20',
      id: 'highAlpine',
      leftClip: 'polygon(100% -3px, 100% 100%, 0 100%)',
      leftWidth: 'w-9',
      rightClip: 'polygon(1px 0%, 100% 44%, 100% 100%, 0px 100%)',
      zone: highAlpine,
      zoneLabel: t('common.elevationZones.highAlpine'),
    },
    {
      height: 'h-[59px]',
      id: 'alpine',
      leftClip: 'polygon(40% 0px, 100% 0 , 100% 100%, 0px 100%)',
      leftWidth: 'w-[63px]',
      rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
      zone: alpine,
      zoneLabel: t('common.elevationZones.alpine'),
    },
    {
      height: 'h-[60px]',
      id: 'subAlpine',
      leftClip: 'polygon(29% 0px, 100% 0px, 100% 100%, 0px 100%)',
      leftWidth: 'w-[91px]',
      rightClip: 'polygon(1px 0%, 100% 0, 100% 100%, 0px 100%)',
      zone: subAlpine,
      zoneLabel: t('common.elevationZones.subAlpine'),
    },
  ]

  return (
    <>
      <div className="absolute right-0 bottom-0 flex flex-col items-end gap-[5px] pb-[18px]">
        {elevationZones.map(({ height, id, leftClip, leftWidth, rightClip, zone, zoneLabel }) => (
          <div
            key={id}
            className={clsx('flex cursor-pointer', height)}
            onClick={() => setSelected({ level: zone, zoneLabel })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSelected({ level: zone, zoneLabel })
              }
            }}
            role="button"
            tabIndex={0}
          >
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
              <p className="rounded-sm bg-white px-2 py-1 text-xs">
                {t(hazardLevelNamesByScale[zone])}
              </p>
            </div>
            <div
              className={clsx('w-4', backgroundColorByHazardLevel[zone])}
              style={{ clipPath: rightClip }}
            />
          </div>
        ))}
      </div>

      <HazardLevelInfoDrawer
        isOpen={selected !== null}
        level={selected?.level ?? highAlpine}
        onClose={() => setSelected(null)}
        zone={selected?.zoneLabel}
      />
    </>
  )
}

export default Pyramid
