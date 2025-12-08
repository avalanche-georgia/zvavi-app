'use client'

import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'
import { PageWrapper } from '@/UI/containers'

const AdminPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title="Admin Page">
      <Link className="flex h-12 items-center px-3.5" href={routes.adminForecasts}>
        {t('admin.forecasts.title')}
      </Link>
    </PageWrapper>
  )
}

export default AdminPage
