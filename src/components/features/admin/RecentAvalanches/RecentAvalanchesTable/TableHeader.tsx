import { useTranslations } from 'next-intl'

const TableHeader = () => {
  const t = useTranslations()

  return (
    <header className="flex w-full items-center gap-5 border-b bg-gray-100 px-4 py-1.5">
      <div className="w-28 shrink-0 text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.date')}
      </div>
      <div className="w-28 shrink-0 text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.createdAt')}
      </div>
      <div className="w-28 shrink-0 text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.type')}
      </div>
      <div className="w-14 shrink-0 text-center text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.size')}
      </div>
      <div className="w-36 shrink-0 text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.trigger')}
      </div>
      <div className="w-36 shrink-0 text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.location')}
      </div>
      <div className="min-w-0 flex-1 text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.description')}
      </div>
      <div className="w-20 shrink-0 text-right text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.actions')}
      </div>
    </header>
  )
}

export default TableHeader
