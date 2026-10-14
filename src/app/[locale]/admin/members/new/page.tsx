import { redirect } from 'src/i18n/navigation'

import { routes } from '@/routes'

type NewMemberPageProps = { params: Promise<{ locale: string }> }

// Adding a member happens in a sheet over the list — old links land there
const NewMemberPage = async ({ params }: NewMemberPageProps) => {
  const { locale } = await params

  redirect({ href: routes.admin.members.create, locale })
}

export default NewMemberPage
