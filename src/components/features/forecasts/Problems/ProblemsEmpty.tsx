import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

const ProblemsEmpty = ({ onAdd }: { onAdd: VoidFunction }) => {
  const t = useTranslations()

  return (
    <div className="border-rule-strong flex flex-col items-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed p-6.5 text-center">
      <p className="text-copy text-ink font-semibold">
        {t('admin.forecast.editor.problems.emptyTitle')}
      </p>
      <p className="text-copy-sm text-muted">{t('admin.forecast.editor.problems.emptyText')}</p>
      <Button className="mt-2" onClick={onAdd} size="sm" variant="secondary">
        <Plus aria-hidden className="size-4" />
        {t('admin.forecast.editor.problems.add')}
      </Button>
    </div>
  )
}

export default ProblemsEmpty
