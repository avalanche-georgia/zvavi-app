'use client'

import { useCopyWithFeedback } from '@components/hooks'
import { IconButton, Tooltip } from '@components/ui'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type ActionButtonsProps = {
  editHref: string
  forecastPath: string
  isPublished: boolean
  onDelete: VoidFunction
  onDuplicate: VoidFunction
  onStatusToggle: VoidFunction
}

const ActionButtons = ({
  editHref,
  forecastPath,
  isPublished,
  onDelete,
  onDuplicate,
  onStatusToggle,
}: ActionButtonsProps) => {
  const t = useTranslations()
  const forecastUrl = `${window.location.origin}${forecastPath}`
  const { handleCopy, isCopied } = useCopyWithFeedback(forecastUrl)

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip content={t(`admin.forecasts.actions.${isPublished ? 'unpublish' : 'publish'}`)}>
        <IconButton iconProps={{ icon: isPublished ? 'eyeOff' : 'eye' }} onClick={onStatusToggle} />
      </Tooltip>
      <Tooltip content={t('admin.forecasts.actions.copyUrl')}>
        <IconButton
          className={clsx(isCopied && 'animate-copy-pop stroke-green-600!')}
          iconProps={{ icon: isCopied ? 'check' : 'link' }}
          onClick={handleCopy}
        />
      </Tooltip>
      <Tooltip content={t('admin.forecasts.actions.duplicate')}>
        <IconButton iconProps={{ icon: 'copy' }} onClick={onDuplicate} />
      </Tooltip>
      <Tooltip content={t('admin.forecasts.actions.edit')}>
        <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
      </Tooltip>
      <Tooltip content={t('admin.forecasts.actions.delete')}>
        <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
      </Tooltip>
    </div>
  )
}

export default ActionButtons
