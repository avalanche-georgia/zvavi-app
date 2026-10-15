'use client'

import { DetailsSheet, NewTabLink } from '@components/shared'
import { FormCheckbox } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import type { MemberApplicationFormSchema as FormSchema } from './schema'

import { routes } from '@/routes'

const linkClasses =
  'focus-ring text-accent hover:text-accent-hover rounded-sm underline underline-offset-2'

const CharterSheetButton = ({ chunks }: { chunks: React.ReactNode }) => {
  const t = useTranslations()

  return (
    <DetailsSheet
      title={t('joinUs.apply.charter.drawerTitle')}
      trigger={
        <button className={linkClasses} type="button">
          {chunks}
        </button>
      }
    >
      <p className="text-copy-lg text-body">{t('joinUs.apply.charter.content')}</p>
    </DetailsSheet>
  )
}

const charterLink = (chunks: React.ReactNode) => <CharterSheetButton chunks={chunks} />

// New tab: following them must not throw away the filled-in form
const privacyLink = (chunks: React.ReactNode) => (
  <NewTabLink className={linkClasses} href={routes.privacy}>
    {chunks}
  </NewTabLink>
)

const termsLink = (chunks: React.ReactNode) => (
  <NewTabLink className={linkClasses} href={routes.terms}>
    {chunks}
  </NewTabLink>
)

const AgreementsSection = () => {
  const t = useTranslations()

  return (
    <FormCard
      required
      requiredText={t('common.validation.required')}
      title={t('joinUs.apply.sections.agreements')}
    >
      <div className="flex flex-col gap-3">
        <FormCheckbox<FormSchema>
          label={t.rich('joinUs.apply.charter.checkbox', { link: charterLink })}
          name="charterAgreed"
          requiredMessage={t('joinUs.apply.agreementRequired')}
        />
        <FormCheckbox<FormSchema>
          label={t.rich('legal.consent.checkbox', { link: privacyLink, link2: termsLink })}
          name="privacyAgreed"
          requiredMessage={t('joinUs.apply.agreementRequired')}
        />
      </div>
    </FormCard>
  )
}

export default AgreementsSection
