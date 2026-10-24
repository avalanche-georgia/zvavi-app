import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { LinkPendingIndicator } from './list'

type RecordNotFoundProps = {
  // The list the record would belong to
  backHref: string
  message: string
}

// A direct link to a record that doesn't exist (deleted, mistyped id)
const RecordNotFound = ({ backHref, message }: RecordNotFoundProps) => {
  const t = useTranslations()

  return (
    <div className="rounded-card border-rule bg-surface flex flex-col items-center gap-3 border p-6 text-center">
      <p className="text-body">{message}</p>
      <Link className="text-accent focus-ring rounded-badge hover:underline" href={backHref}>
        {t('common.actions.backToList')}
        <LinkPendingIndicator />
      </Link>
    </div>
  )
}

export default RecordNotFound
