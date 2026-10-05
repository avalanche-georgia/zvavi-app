import type { RegionId } from '@domain/types'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { LinkPendingIndicator } from '../../shared'

import { routes } from '@/routes'

const Breadcrumb = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <nav
      aria-label={t('admin.forecasts.view.breadcrumb')}
      className="text-copy-sm text-muted flex items-center gap-1.5"
    >
      <Link
        className="hover:text-ink focus-ring flex items-center gap-1"
        href={routes.admin.forecasts.listByRegion(regionId)}
      >
        <ArrowLeft aria-hidden className="size-3.75" />
        {t('admin.forecasts.title')}
        <LinkPendingIndicator />
      </Link>
      <span aria-hidden>/</span>
      <span>{t(`regions.names.${regionId}`)}</span>
    </nav>
  )
}

export default Breadcrumb
