import { redirect } from 'src/i18n/navigation'

import { routes } from '@/routes'

type MemberPageProps = { params: Promise<{ id: string; locale: string }> }

// A member opens in a sheet over the list — old links land there
const MemberPage = async ({ params }: MemberPageProps) => {
  const { id, locale } = await params

  redirect({ href: routes.admin.members.view(id), locale })
}

export default MemberPage
