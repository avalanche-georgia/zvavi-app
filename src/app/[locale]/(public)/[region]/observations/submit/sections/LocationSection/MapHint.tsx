import { useTranslations } from 'next-intl'

const MapHint = ({ hasPin }: { hasPin: boolean }) => {
  const t = useTranslations()

  return (
    <span className="bg-ink/82 text-copy-sm pointer-events-none absolute bottom-3 left-1/2 z-1000 -translate-x-1/2 rounded-full px-3 py-1.75 whitespace-nowrap text-white">
      {t(hasPin ? 'observations.submit.location.dragHint' : 'observations.submit.location.tapHint')}
    </span>
  )
}

export default MapHint
