'use client'

import { useRegionContext } from '@domain/context/RegionContext'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

// The active region's name. With one region it leads to that region's home; with
// several, to the region chooser — where picking one is remembered.
const RegionSwitcher = ({ onNavigate }: { onNavigate?: () => void }) => {
  const t = useTranslations()
  const { region, regions } = useRegionContext()
  const hasChoice = regions.length > 1

  if (!region && !hasChoice) return null

  return (
    <Link
      className={cn(
        'focus-ring border-rule bg-surface rounded-control text-copy hover:bg-tile flex h-9 items-center gap-1.5 border px-3 font-medium whitespace-nowrap transition-colors',
        region ? 'text-ink' : 'text-muted',
      )}
      href={hasChoice || !region ? routes.regions : routes.regionHome(region.id)}
      onClick={onNavigate}
    >
      <MapPin aria-hidden className="text-muted size-3.5" />
      {region ? (
        <>
          {/* Says where the link goes when the name alone would read as "this region" */}
          {hasChoice && <span className="sr-only">{t('navigation.chooseRegion')}: </span>}
          {t(`regions.names.${region.id}`)}
        </>
      ) : (
        t('navigation.chooseRegion')
      )}
    </Link>
  )
}

export default RegionSwitcher
