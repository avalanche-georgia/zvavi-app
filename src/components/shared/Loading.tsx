import { LoadingState } from '@ds/patterns'
import { useTranslations } from 'next-intl'

type LoadingProps = {
  className?: string
  // A whole page (route fallback) or a block inside one
  isPage?: boolean
}

// The "Loading…" placeholder for a page or for a block inside one
const Loading = ({ className, isPage = false }: LoadingProps) => {
  const t = useTranslations()

  return <LoadingState className={className} isPage={isPage} label={t('common.messages.loading')} />
}

export default Loading
