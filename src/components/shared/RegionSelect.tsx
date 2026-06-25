'use client'

import { Select } from '@base-ui/react/select'
import { Icon } from '@components/icons'
import { regionLocalStorageKey } from '@domain/constants'
import { useRegionContext } from '@domain/context/RegionContext'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

type RegionSelectProps = {
  onSelect?: () => void
}

const RegionSelect = ({ onSelect }: RegionSelectProps) => {
  const t = useTranslations()
  const router = useRouter()
  const { region, regions } = useRegionContext()

  const handleValueChange = (regionId: string | null) => {
    console.log('regionId: ', regionId)
    if (!regionId) return

    document.cookie = `${regionLocalStorageKey}=${regionId}; path=/; max-age=31536000; SameSite=Lax`
    router.push(routes.regionHome(regionId))
    onSelect?.()
  }

  return (
    <Select.Root onValueChange={handleValueChange} value={region?.id ?? null}>
      <Select.Trigger
        className={clsx(
          'flex items-center gap-1 rounded-sm border px-2 py-1 text-sm font-medium shadow-xs backdrop-blur-sm',
          'transition-colors hover:bg-gray-100',
          !region && 'text-gray-400',
        )}
      >
        <Select.Value>
          {(value: string | null) =>
            value ? t(`regions.names.${value}`) : t('regions.selector.label')
          }
        </Select.Value>
        <Icon className="size-3.5" icon="chevronDown" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className="z-[60]" sideOffset={6}>
          <Select.Popup
            className={clsx(
              'min-w-36 overflow-hidden rounded-xl p-1',
              'bg-white shadow-lg ring-1 ring-black/5',
            )}
          >
            {regions.map((r) => (
              <Select.Item
                key={r.id}
                className={clsx(
                  'flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm outline-hidden',
                  'transition-colors',
                  'data-highlighted:bg-gray-100',
                  'data-selected:text-primary text-gray-700 data-selected:font-medium',
                )}
                value={r.id}
              >
                <Select.ItemText>{t(`regions.names.${r.id}`)}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

export default RegionSelect
