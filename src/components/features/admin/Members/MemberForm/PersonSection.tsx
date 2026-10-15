'use client'

import { memberGenders } from '@domain/constants'
import type { MemberFormData } from '@domain/types'
import { FormNumberField, FormSelect, FormTextarea, FormTextField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { fieldGridClasses } from './constants'

const labelKey = 'admin.members.form.labels'
const placeholderKey = 'admin.members.form.placeholders'

// The same personal details the public application asks for (no payment, no agreements)
const PersonSection = () => {
  const t = useTranslations()

  const genderOptions = memberGenders.map((gender) => ({
    label: t(`admin.members.genders.${gender}`),
    value: gender,
  }))

  return (
    <FormCard title={t('admin.members.form.sections.person')}>
      <div className={fieldGridClasses}>
        <FormTextField<MemberFormData>
          autoComplete="off"
          label={t(`${labelKey}.firstName`)}
          name="firstName"
          required
        />
        <FormTextField<MemberFormData>
          autoComplete="off"
          label={t(`${labelKey}.lastName`)}
          name="lastName"
          required
        />
        <FormTextField<MemberFormData>
          autoComplete="off"
          label={t(`${labelKey}.email`)}
          name="email"
          type="email"
        />
        <FormTextField<MemberFormData>
          autoComplete="off"
          label={t(`${labelKey}.phone`)}
          name="phone"
          type="tel"
        />
        <FormNumberField<MemberFormData>
          format={{ maximumFractionDigits: 0 }}
          label={t(`${labelKey}.age`)}
          max={120}
          min={0}
          name="age"
          placeholder={t(`${placeholderKey}.age`)}
        />
        <FormSelect<MemberFormData, string>
          label={t(`${labelKey}.gender`)}
          name="gender"
          options={genderOptions}
          placeholder={t(`${placeholderKey}.gender`)}
        />
        <FormTextField<MemberFormData>
          autoComplete="off"
          label={t(`${labelKey}.address`)}
          name="address"
          placeholder={t(`${placeholderKey}.address`)}
        />
        <FormTextField<MemberFormData>
          autoComplete="off"
          label={t(`${labelKey}.occupation`)}
          name="occupation"
          placeholder={t(`${placeholderKey}.occupation`)}
        />
      </div>
      <FormTextarea<MemberFormData>
        label={t(`${labelKey}.motivation`)}
        name="motivation"
        placeholder={t(`${placeholderKey}.motivation`)}
      />
    </FormCard>
  )
}

export default PersonSection
