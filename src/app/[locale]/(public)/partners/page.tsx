import { PageContent } from '@components/features/partners'
import { PageWrapper } from '@components/layout'
import { convertSnakeToCamel } from '@data/helpers'
import type { Partner } from '@domain/types'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { createClient } from 'src/lib/supabase/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.partners.description'),
    title: t('seo.partners.title'),
  }
}

const PartnersPage = async () => {
  const t = await getTranslations()
  const supabase = await createClient()

  const { data } = await supabase
    .from('partners')
    .select('*')
    .eq('is_active', true)
    .order('name_en', { ascending: true })

  const initialPartners = convertSnakeToCamel(data ?? []) as Partner[]

  return (
    <PageWrapper title={t('navigation.partners')}>
      <PageContent initialPartners={initialPartners} />
    </PageWrapper>
  )
}

export default PartnersPage
