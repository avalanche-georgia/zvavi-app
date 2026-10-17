import { TeamPageContent } from '@components/features/team'
import { ContentPage } from '@components/layout'
import fetchTeamMembers from '@data/queries/fetchTeamMembers'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

// Profile changes (opt-in, photo, bio) show up within a few minutes
export const revalidate = 300

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.about.team),
    description: t('seo.team.description'),
    title: t('seo.team.title'),
  }
}

// A failed load throws to the (public) error boundary
const TeamPage = async () => {
  const [t, members] = await Promise.all([getTranslations(), fetchTeamMembers()])

  return (
    <ContentPage lede={t('team.lede')} title={t('team.title')}>
      <TeamPageContent members={members} />
    </ContentPage>
  )
}

export default TeamPage
