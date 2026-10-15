'use client'

import { FormNumberField, FormSelect, FormTextarea, FormTextField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { genderKeys, type MemberApplicationFormData as FormData } from './schema'

// Contact details are required; the rest helps us get to know the applicant
const ApplicantSection = () => {
  const t = useTranslations()

  const genderOptions = genderKeys.map((key) => ({
    label: t(`joinUs.apply.genderOptions.${key}`),
    value: key,
  }))

  return (
    <FormCard title={t('joinUs.apply.sections.aboutYou')}>
      <div className="grid gap-5 md:grid-cols-2">
        <FormTextField<FormData>
          autoComplete="given-name"
          label={t('joinUs.apply.labels.firstName')}
          name="firstName"
          required
        />
        <FormTextField<FormData>
          autoComplete="family-name"
          label={t('joinUs.apply.labels.lastName')}
          name="lastName"
          required
        />
        <FormTextField<FormData>
          autoComplete="email"
          label={t('joinUs.apply.labels.email')}
          name="email"
          placeholder={t('joinUs.apply.placeholders.email')}
          required
          type="email"
        />
        <FormTextField<FormData>
          autoComplete="tel"
          label={t('joinUs.apply.labels.phone')}
          name="phone"
          placeholder={t('joinUs.apply.placeholders.phone')}
          required
          type="tel"
        />
        <FormNumberField<FormData>
          label={t('joinUs.apply.labels.age')}
          max={120}
          min={0}
          name="age"
        />
        <FormSelect<FormData, string>
          label={t('joinUs.apply.labels.gender')}
          name="gender"
          options={genderOptions}
          placeholder={t('joinUs.apply.placeholders.gender')}
        />
      </div>
      <FormTextField<FormData>
        label={t('joinUs.apply.labels.address')}
        name="address"
        placeholder={t('joinUs.apply.placeholders.address')}
      />
      <FormTextField<FormData>
        label={t('joinUs.apply.labels.occupation')}
        name="occupation"
        placeholder={t('joinUs.apply.placeholders.occupation')}
      />
      <FormTextarea<FormData>
        label={t('joinUs.apply.labels.motivation')}
        name="motivation"
        placeholder={t('joinUs.apply.placeholders.motivation')}
      />
    </FormCard>
  )
}

export default ApplicantSection
