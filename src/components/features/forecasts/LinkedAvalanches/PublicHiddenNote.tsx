import type { AvalancheStatus } from '@domain/types'
import { EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'

// The public forecast lists published records only
const PublicHiddenNote = ({ status }: { status: Exclude<AvalancheStatus, 'published'> }) => {
  const t = useTranslations()

  return (
    <p className="text-caption text-warning flex items-center gap-1 font-medium">
      <EyeOff aria-hidden className="size-3.5" />
      {t(`admin.forecast.editor.avalanches.hiddenOnPublic.${status}`)}
    </p>
  )
}

export default PublicHiddenNote
