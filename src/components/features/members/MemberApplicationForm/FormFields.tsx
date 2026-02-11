'use client'

/* eslint-disable react/jsx-props-no-spreading */

import { InputBlock, Textarea, TextInput } from '@components/ui'
import Select, { toOptions } from '@components/ui/Select'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { MemberApplicationFormData } from './schema'

const genderKeys = ['male', 'female', 'preferNotToSay'] as const

const FormFields = () => {
  const t = useTranslations()
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<MemberApplicationFormData>()

  const getError = (field: keyof MemberApplicationFormData) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <InputBlock error={getError('fullName')} label={t('joinUs.apply.labels.fullName')} required>
          <TextInput
            {...register('fullName')}
            placeholder={t('joinUs.apply.placeholders.fullName')}
          />
        </InputBlock>
        <InputBlock error={getError('email')} label={t('joinUs.apply.labels.email')} required>
          <TextInput
            {...register('email')}
            placeholder={t('joinUs.apply.placeholders.email')}
            type="email"
          />
        </InputBlock>
        <InputBlock error={getError('phone')} label={t('joinUs.apply.labels.phone')} required>
          <TextInput {...register('phone')} placeholder={t('joinUs.apply.placeholders.phone')} />
        </InputBlock>
        <InputBlock error={getError('address')} label={t('joinUs.apply.labels.address')}>
          <TextInput
            {...register('address')}
            placeholder={t('joinUs.apply.placeholders.address')}
          />
        </InputBlock>
        <InputBlock label={t('joinUs.apply.labels.age')}>
          <TextInput {...register('age')} inputMode="numeric" min={0} type="number" />
        </InputBlock>
        <InputBlock label={t('joinUs.apply.labels.gender')}>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                onChange={field.onChange}
                options={toOptions(genderKeys, (key) => t(`joinUs.apply.genderOptions.${key}`))}
                placeholder={t('joinUs.apply.placeholders.gender')}
                value={field.value ?? ''}
              />
            )}
          />
        </InputBlock>
      </div>
      <InputBlock label={t('joinUs.apply.labels.occupation')}>
        <TextInput
          {...register('occupation')}
          placeholder={t('joinUs.apply.placeholders.occupation')}
        />
      </InputBlock>
      <InputBlock label={t('joinUs.apply.labels.motivation')}>
        <Textarea
          {...register('motivation')}
          placeholder={t('joinUs.apply.placeholders.motivation')}
          rows={4}
        />
      </InputBlock>
    </>
  )
}

export default FormFields
