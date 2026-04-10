import { type IconName, iconRenderers } from '@components/icons'
import { IconButton } from '@components/ui/IconButton'
import clsx from 'clsx'

export type AlertVariant = 'error' | 'info' | 'success' | 'warning'

type AlertProps = {
  children: React.ReactNode
  className?: string
  onClose?: VoidFunction
  variant?: AlertVariant
}

const variantStyles: Record<AlertVariant, { container: string; icon: string; iconName: IconName }> =
  {
    error: {
      container: 'border-red-200 bg-red-50 text-red-900',
      icon: 'text-red-500',
      iconName: 'circleAlert',
    },
    info: {
      container: 'border-blue-200 bg-blue-50 text-blue-900',
      icon: 'text-blue-500',
      iconName: 'info',
    },
    success: {
      container: 'border-green-200 bg-green-50 text-green-900',
      icon: 'text-green-500',
      iconName: 'circleCheck',
    },
    warning: {
      container: 'border-amber-200 bg-amber-50 text-amber-900',
      icon: 'text-amber-500',
      iconName: 'triangleAlert',
    },
  }

const Alert = ({ children, className, onClose, variant = 'info' }: AlertProps) => {
  const { container, icon, iconName } = variantStyles[variant]
  const IconRenderer = iconRenderers[iconName]

  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm',
        container,
        className,
      )}
    >
      <IconRenderer className={clsx('shrink-0', icon)} size={16} />
      <div className="flex-1">{children}</div>
      {onClose && (
        <IconButton
          aria-label="Dismiss"
          className="shrink-0"
          iconProps={{ icon: 'xMark' }}
          onClick={onClose}
          size="sm"
        />
      )}
    </div>
  )
}

export default Alert
