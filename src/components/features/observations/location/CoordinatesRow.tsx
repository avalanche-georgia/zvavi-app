import { useCopyWithFeedback } from '@components/hooks'
import { useTranslations } from 'next-intl'

type CoordinatesRowProps = {
  latitude: number
  longitude: number
}

const CoordinatesRow = ({ latitude, longitude }: CoordinatesRowProps) => {
  const t = useTranslations()
  const coordinates = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
  const { handleCopy, isCopied } = useCopyWithFeedback(coordinates)

  return (
    <div className="flex items-center gap-2.5 px-4 pt-3.5">
      <code className="flex-1 font-mono text-sm font-medium">{coordinates}</code>
      <button
        className="border-rule hover:bg-tile h-9 rounded-[11px] border bg-white px-3.5 text-[13px] font-semibold transition-colors"
        onClick={handleCopy}
        type="button"
      >
        {isCopied ? t('common.actions.copied') : t('common.actions.copy')}
      </button>
    </div>
  )
}

export default CoordinatesRow
