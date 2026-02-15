import { MemberApplicationForm } from '@components/features/members/MemberApplicationForm'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    title: t('joinUs.apply.title'),
  }
}

const ApplyPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('joinUs.apply.title')}>
      <MemberApplicationForm />
    </PageWrapper>
  )
}

export default ApplyPage
