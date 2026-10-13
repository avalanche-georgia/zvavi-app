import { useTranslations } from 'next-intl'

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toLocaleUpperCase())
    .join('')

// Full-width fact: initials avatar + the forecaster's name
const ForecasterRow = ({ name }: { name: string }) => {
  const t = useTranslations()

  return (
    <div className="bg-surface col-span-full px-4 py-2.5">
      <dt className="text-muted text-xs">{t('common.labels.forecaster')}</dt>
      <dd className="mt-1.5 flex items-center gap-2.5">
        <span
          aria-hidden
          className="bg-primary-soft text-primary-ink grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold"
        >
          {getInitials(name)}
        </span>
        <span className="text-copy text-ink min-w-0 font-semibold wrap-anywhere">{name}</span>
      </dd>
    </div>
  )
}

export default ForecasterRow
