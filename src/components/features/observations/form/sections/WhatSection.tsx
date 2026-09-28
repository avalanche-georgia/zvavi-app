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
import type { ObservationFormFields } from '../schema'

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
          {t('observations.form.what.encyclopedia')} ↗
        </a>
      }
      title={t('observations.form.sections.what')}
    >
      <FormChipGroup<ObservationFormFields, (typeof typeOptions)[number]['value']>
        emptyValue=""
        isDeselectable
        label={t('observations.form.labels.type')}
        name="type"
        options={typeOptions}
        required
        requiredMessage={t('observations.form.what.typeRequired')}
        requiredText={t('common.validation.required')}
      />
      <FormChipGroup<ObservationFormFields, (typeof triggerOptions)[number]['value']>
        emptyValue=""
        isDeselectable
        label={t('observations.form.labels.trigger')}
        name="trigger"
        options={triggerOptions}
        required
        requiredMessage={t('observations.form.what.triggerRequired')}
        requiredText={t('common.validation.required')}
      />
      <SizeField />
      <FormStepper<ObservationFormFields>
        decrementLabel={t('observations.form.what.fewer')}
        incrementLabel={t('observations.form.what.more')}
        label={t('observations.form.labels.quantity')}
        max={quantity.max}
        min={quantity.min}
        name="quantity"
      />
      <DimensionsFields />
    </FormCard>
  )
}

export default WhatSection
