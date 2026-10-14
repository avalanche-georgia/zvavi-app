'use client'

import { Tooltip } from '@ds/primitives'

type AvatarButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  // Accessible name, also shown as the tooltip
  label: string
  ref?: React.Ref<HTMLButtonElement>
}

// Round initials button. Passes the props a Menu trigger adds on to the <button>.
const AvatarButton = ({ children, label, ...props }: AvatarButtonProps) => (
  <Tooltip label={label}>
    <button
      {...props}
      aria-label={label}
      className="focus-ring bg-primary-soft text-primary-ink text-caption relative grid size-9 shrink-0 place-items-center rounded-full font-bold after:absolute pointer-coarse:after:-inset-1"
      type="button"
    >
      {children}
    </button>
  </Tooltip>
)

export default AvatarButton
