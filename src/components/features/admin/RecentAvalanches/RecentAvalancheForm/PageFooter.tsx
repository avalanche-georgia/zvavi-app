import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type PageFooterProps = {
  isBusy: boolean
  onCancel: VoidFunction
}

// Full-page variant's actions. Save submits the form — while photos are still
// uploading it stays busy and saves once they finish.
const PageFooter = ({ isBusy, onCancel }: PageFooterProps) => {
  const t = useTranslations()

  return (
    <div className="flex justify-end gap-2 pt-1">
      <Button onClick={onCancel} variant="secondary">
        {t('common.actions.cancel')}
      </Button>
      <Button isBusy={isBusy} type="submit">
        {t('common.actions.save')}
      </Button>
    </div>
  )
}

export default PageFooter
