import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

const ForgetDetailsNote = ({ onForget }: { onForget: () => void }) => {
  const t = useTranslations()

  return (
    <p className="text-copy-sm text-muted">
      {t('observations.submit.aboutYou.savedOnDevice')}{' '}
      <Button onClick={onForget} size="sm" variant="text">
        {t('observations.submit.aboutYou.forget')}
      </Button>
    </p>
  )
}

export default ForgetDetailsNote
