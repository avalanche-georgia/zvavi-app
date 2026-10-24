import { useCopyWithFeedback } from '@components/hooks'
import { Button } from '@ds/primitives'
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
      <code className="text-copy flex-1 font-mono font-medium">{coordinates}</code>
      <Button onClick={handleCopy} size="sm" variant="secondary">
        {isCopied ? t('common.actions.copied') : t('common.actions.copy')}
      </Button>
    </div>
  )
}

export default CoordinatesRow
