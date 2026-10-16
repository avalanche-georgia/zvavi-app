import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

// The danger card's footer row: "Read full forecast ›"
const ReadForecastLink = ({ href }: { href: string }) => {
  const t = useTranslations()

  return (
    <Link
      className="border-rule text-accent hover:bg-accent-soft hover:text-accent-hover text-copy focus-visible:outline-accent flex items-center justify-between border-t px-4 py-3.5 font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2"
      href={href}
    >
      {t('common.actions.readFullForecast')}
      <ChevronRight aria-hidden className="size-4.5" />
    </Link>
  )
}

export default ReadForecastLink
