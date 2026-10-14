import { redirect } from 'src/i18n/navigation'

import { routes } from '@/routes'

type NewPartnerPageProps = { params: Promise<{ locale: string }> }

// Adding a partner happens in a sheet over the list — old links land there
const NewPartnerPage = async ({ params }: NewPartnerPageProps) => {
  const { locale } = await params

  redirect({ href: routes.admin.partners.create, locale })
}

export default NewPartnerPage
