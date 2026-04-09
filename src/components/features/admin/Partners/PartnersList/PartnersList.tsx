'use client'

import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import { TextInput } from '@components/ui'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import PartnerItem from './PartnerItem'
import useFilteredPartners from './useFilteredPartners'

import { routes } from '@/routes'

const PartnersList = ({ partners }: { partners: Partner[] }) => {
  const t = useTranslations()
  const { filteredPartners, search, setSearch } = useFilteredPartners(partners)

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-3">
        <div className="relative">
          <TextInput
            className="w-52 pr-8"
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('admin.partners.filters.searchPlaceholder')}
            value={search}
          />
          <Icon
            containerClassName="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-400"
            icon="search"
            size="sm"
          />
        </div>
        <ButtonLink href={routes.admin.partners.new}>
          <Icon icon="plus" size="sm" />
          {t('admin.partners.title.create')}
        </ButtonLink>
      </div>

      <div className="w-full rounded-sm border bg-white p-4 shadow-sm">
        <div className="flex w-full items-center gap-4 rounded-t bg-gray-100 px-4 py-1.5">
          <div className="w-68 shrink-0 font-semibold">{t('admin.partners.list.columns.name')}</div>
          <div className="min-w-40 flex-1 font-semibold">
            {t('admin.partners.list.columns.benefit')}
          </div>
          <div className="shrink-0 font-semibold">{t('admin.partners.list.columns.status')}</div>
          <div className="w-24 shrink-0 text-right font-semibold">
            {t('admin.partners.list.columns.actions')}
          </div>
        </div>

        {filteredPartners.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            {t('admin.partners.list.noPartners')}
          </div>
        ) : (
          <ul className="flex flex-col">
            {filteredPartners.map((partner) => (
              <li key={partner.id} className="border-b last:border-0">
                <PartnerItem partner={partner} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default PartnersList
