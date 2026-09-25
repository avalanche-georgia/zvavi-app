'use client'

import { links } from '@components/constants'
import {
  avalancheFieldLimits,
  avalancheTriggersOrdered,
  avalancheTypesOrdered,
} from '@domain/constants'
import { FormChipGroup, FormStepper } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import DimensionsFields from './DimensionsFields'
import SizeField from './SizeField'
import type { ObservationSubmitFormSchema } from '../schema'

const { quantity } = avalancheFieldLimits

const WhatSection = () => {
  const t = useTranslations()

  const typeOptions = avalancheTypesOrdered.map((type) => ({
    label: t(`common.avalancheTypes.${type}`),
    value: type,
  }))
  const triggerOptions = avalancheTriggersOrdered.map((trigger) => ({
    label: t(`common.avalancheTriggers.${trigger}`),
    value: trigger,
  }))

  return (
    <FormCard
      headerAside={
        <a
          className="text-accent hover:text-accent-hover focus-ring font-semibold"
          href={links.avalancheEncyclopedia}
          rel="noreferrer"
          target="_blank"
        >
          {t('observations.submit.what.encyclopedia')} ↗
        </a>
      }
      title={t('observations.submit.sections.what')}
    >
      <FormChipGroup<ObservationSubmitFormSchema, (typeof typeOptions)[number]['value']>
        emptyValue=""
        isDeselectable
        label={t('observations.submit.labels.type')}
        name="type"
        options={typeOptions}
        required
        requiredMessage={t('observations.submit.what.typeRequired')}
      />
      <FormChipGroup<ObservationSubmitFormSchema, (typeof triggerOptions)[number]['value']>
        emptyValue=""
        isDeselectable
        label={t('observations.submit.labels.trigger')}
        name="trigger"
        options={triggerOptions}
        required
        requiredMessage={t('observations.submit.what.triggerRequired')}
      />
      <SizeField />
      <FormStepper<ObservationSubmitFormSchema>
        decrementLabel={t('observations.submit.what.fewer')}
        incrementLabel={t('observations.submit.what.more')}
        label={t('observations.submit.labels.quantity')}
        max={quantity.max}
        min={quantity.min}
        name="quantity"
      />
      <DimensionsFields />
    </FormCard>
  )
}

export default WhatSection
