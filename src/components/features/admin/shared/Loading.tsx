import { LoadingState } from '@ds/patterns'
import { useTranslations } from 'next-intl'

// Admin's "Loading…" placeholder: a whole page (route fallbacks) or a block inside one
const Loading = ({ isPage = false }: { isPage?: boolean }) => {
  const t = useTranslations()

  return <LoadingState isPage={isPage} label={t('common.messages.loading')} />
}

export default Loading
