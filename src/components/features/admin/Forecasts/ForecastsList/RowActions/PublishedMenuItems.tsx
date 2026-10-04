import { MenuItem } from '@ds/primitives'
import { ExternalLink, EyeOff, Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { ForecastRowActions } from './useForecastRowActions'

const PublishedMenuItems = ({ actions }: { actions: ForecastRowActions }) => {
  const t = useTranslations()

  return (
    <>
      <MenuItem icon={<ExternalLink />} onClick={actions.onPublicPageOpen}>
        {t('admin.forecasts.actions.openPublicPage')}
      </MenuItem>
      <MenuItem icon={<Link2 />} onClick={actions.onLinkCopy}>
        {t('admin.forecasts.actions.copyLink')}
      </MenuItem>
      <MenuItem icon={<EyeOff />} onClick={actions.onUnpublish}>
        {t('admin.forecasts.actions.unpublish')}
      </MenuItem>
    </>
  )
}

export default PublishedMenuItems
