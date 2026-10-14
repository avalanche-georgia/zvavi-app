import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

// "Gudauri" · "Avalanche forecast & conditions"
const RegionHead = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <div className="pt-4 pb-3 lg:pt-6 lg:pb-4">
      <h1 className="text-title lg:text-title-lg m-0 font-bold">
        {t(`regions.names.${regionId}`)}
      </h1>
      <p className="text-muted text-copy-sm mt-1">{t('regionHome.subtitle')}</p>
    </div>
  )
}

export default RegionHead
