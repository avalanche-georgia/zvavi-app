'use client'

import { Select } from '@base-ui/react/select'
import { regionLocalStorageKey } from '@domain/constants'
import { useRegionContext } from '@domain/context/RegionContext'
import { Check, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type RegionSelectProps = {
  onSelect?: () => void
}

// Picks the region the site remembers and opens its page
const RegionSelect = ({ onSelect }: RegionSelectProps) => {
  const t = useTranslations()
  const router = useRouter()
  const { region, regions } = useRegionContext()

  const handleValueChange = (regionId: string | null) => {
    if (!regionId) return

    document.cookie = `${regionLocalStorageKey}=${regionId}; path=/; max-age=31536000; SameSite=Lax`
    router.push(routes.regionHome(regionId))
    onSelect?.()
  }

  return (
    <Select.Root onValueChange={handleValueChange} value={region?.id ?? null}>
      <Select.Trigger
        className={cn(
          'focus-ring border-rule bg-surface rounded-control text-copy flex h-9 items-center gap-1.5 border px-3 font-medium whitespace-nowrap',
          'hover:bg-tile data-popup-open:border-rule-strong transition-colors',
          region ? 'text-ink' : 'text-muted',
        )}
      >
        <Select.Value>
          {(value: string | null) =>
            value ? t(`regions.names.${value}`) : t('regions.selector.label')
          }
        </Select.Value>
        <ChevronDown aria-hidden className="text-muted size-3.5" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner alignItemWithTrigger={false} className="z-60" sideOffset={6}>
          <Select.Popup className="rounded-field border-rule bg-surface shadow-menu min-w-(--anchor-width) border p-1 outline-hidden">
            {regions.map((regionOption) => (
              <Select.Item
                key={regionOption.id}
                className="rounded-control text-copy text-ink data-highlighted:bg-tile flex cursor-pointer items-center justify-between gap-3 px-3 py-2 outline-hidden select-none data-selected:font-semibold pointer-coarse:py-3"
                value={regionOption.id}
              >
                <Select.ItemText>{t(`regions.names.${regionOption.id}`)}</Select.ItemText>
                <Select.ItemIndicator className="text-accent">
                  <Check aria-hidden className="size-4" strokeWidth={2.5} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

export default RegionSelect
