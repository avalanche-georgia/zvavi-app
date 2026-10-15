'use client'

import { useRegionContext } from '@domain/context/RegionContext'
import { ArrowLeftRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type RegionSwitcherProps = {
  className?: string
  onNavigate?: () => void
}

// "Switch region" → the region chooser, where picking one is remembered. Only while
// there is more than one region (the nav already names the current one).
const RegionSwitcher = ({ className, onNavigate }: RegionSwitcherProps) => {
  const t = useTranslations()
  const { region, regions } = useRegionContext()

  if (regions.length < 2) return null

  return (
    <Link
      className={cn(
        'focus-ring border-rule bg-surface text-ink rounded-control text-copy hover:bg-tile flex h-9 items-center gap-1.5 border px-3 font-medium whitespace-nowrap transition-colors',
        className,
      )}
      href={routes.regions}
      onClick={onNavigate}
    >
      <ArrowLeftRight aria-hidden className="text-muted size-3.5" />
      {region ? t('navigation.switchRegion') : t('navigation.chooseRegion')}
    </Link>
  )
}

export default RegionSwitcher
