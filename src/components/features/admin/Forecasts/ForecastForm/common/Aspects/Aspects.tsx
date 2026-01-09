import { useCallback } from 'react'
import type { Aspect, Avalanche, ElevationZone, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import { AspectSelector } from './AspectSelector'
import type { ProblemFormData } from '../../ProblemsSection/ProblemForm'
import InputBlock from '../InputBlock'

export type SetAspectsData = (value: React.SetStateAction<Problem | Avalanche>) => void

type AspectsProps = {
  data: ProblemFormData | Avalanche
  setData: SetAspectsData
}

const Aspects = ({ data, setData }: AspectsProps) => {
  const t = useTranslations()

  const handleAspectsSelect = useCallback(
    (zone: ElevationZone) => (values: Aspect[]) => {
      setData((prev) => ({
        ...prev,
        aspects: {
          ...prev.aspects,
          [zone]: values,
        },
      }))
    },
    [setData],
  )

  return (
    <div className="flex flex-col gap-3">
      <InputBlock label={t('common.elevationZones.highAlpine')}>
        <AspectSelector
          onChange={handleAspectsSelect('highAlpine')}
          selectedAspects={data.aspects.highAlpine}
        />
      </InputBlock>
      <InputBlock label={t('common.elevationZones.alpine')}>
        <AspectSelector
          onChange={handleAspectsSelect('alpine')}
          selectedAspects={data.aspects.alpine}
        />
      </InputBlock>
      <InputBlock label={t('common.elevationZones.subAlpine')}>
        <AspectSelector
          onChange={handleAspectsSelect('subAlpine')}
          selectedAspects={data.aspects.subAlpine}
        />
      </InputBlock>
    </div>
  )
}

export default Aspects
