import { redirect } from 'src/i18n/navigation'

import { routes } from '@/routes'

type EditPartnerPageProps = { params: Promise<{ id: string; locale: string }> }

// A partner is edited in a sheet over the list — old links land there
const EditPartnerPage = async ({ params }: EditPartnerPageProps) => {
  const { id, locale } = await params

  redirect({ href: routes.admin.partners.edit(id), locale })
}

export default EditPartnerPage
