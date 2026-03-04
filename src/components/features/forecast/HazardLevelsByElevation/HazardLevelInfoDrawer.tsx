'use client'

import { backgroundColorByHazardLevel, hazardIcons } from '@components/constants'
import { IconButton } from '@components/ui'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Drawer } from 'vaul'

import DescriptionRow, { descriptionLabelKeys } from './HazardLevelDescriptionRows'

type Props = {
  isOpen: boolean
  level: HazardLevelScale
  onClose: () => void
  zone?: string
}

const HazardLevelInfoDrawer = ({ isOpen, level, onClose, zone }: Props) => {
  const t = useTranslations()
  const isExtremeRisk = level === '5'

  const sentences = t(`forecast.hazardLevels.descriptions.${level}`)
    .split(' | ')
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <Drawer.Root
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
      open={isOpen}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/30" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 mx-auto flex max-h-[calc(100dvh-72px)] max-w-screen-md flex-col rounded-t-2xl bg-white outline-none">
          <Drawer.Title asChild>
            <header
              className={clsx(
                'flex items-center gap-3 rounded-t-2xl p-4',
                backgroundColorByHazardLevel[level],
                isExtremeRisk ? 'text-white' : 'text-black',
              )}
            >
              <Image alt="Danger level" height={64} src={hazardIcons[level]} width={64} />
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-sm font-semibold">{`${t('common.labels.overallDangerLevel')} — ${level}`}</p>
                <h3 className="text-2xl font-semibold">{t(hazardLevelNamesByScale[level])}</h3>
                {zone && <p className="text-sm opacity-80">{zone}</p>}
              </div>
              <Drawer.Close asChild>
                <IconButton
                  className={clsx('self-start', isExtremeRisk ? 'text-white' : 'text-black')}
                  iconProps={{ icon: 'xMark' }}
                />
              </Drawer.Close>
            </header>
          </Drawer.Title>
          <Drawer.Description asChild>
            <div className="flex-1 overflow-y-auto p-4">
              <dl className="flex flex-col gap-4">
                {descriptionLabelKeys.map((labelKey, i) => {
                  const sentence = sentences[i]

                  if (!sentence) return null

                  return <DescriptionRow key={labelKey} labelKey={labelKey} text={sentence} />
                })}
              </dl>
            </div>
          </Drawer.Description>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default HazardLevelInfoDrawer
