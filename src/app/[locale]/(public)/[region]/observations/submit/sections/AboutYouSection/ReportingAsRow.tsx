import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import ForgetDetailsNote from './ForgetDetailsNote'
import getInitials from './getInitials'
import type { SubmitterDetails } from '../../submitterDetailsStorage'

type ReportingAsRowProps = {
  details: SubmitterDetails
  onEdit: () => void
  onForget: () => void
}

// Compact "who's reporting" summary for details remembered on this device.
// Also the look signed-in profiles will use.
const ReportingAsRow = ({ details, onEdit, onForget }: ReportingAsRowProps) => {
  const t = useTranslations()
  const { submitterContact, submitterEducation, submitterName } = details
  const secondaryLine = [submitterEducation, submitterContact].filter(Boolean).join(' · ')

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="bg-primary-soft text-primary-ink flex size-10.5 shrink-0 items-center justify-center rounded-full font-bold"
        >
          {getInitials(submitterName)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-copy-lg text-ink truncate font-semibold">{submitterName}</p>
          {secondaryLine && <p className="text-copy-sm text-muted truncate">{secondaryLine}</p>}
        </div>
        <Button onClick={onEdit} variant="text">
          {t('observations.submit.aboutYou.edit')}
        </Button>
      </div>
      <ForgetDetailsNote onForget={onForget} />
    </div>
  )
}

export default ReportingAsRow
