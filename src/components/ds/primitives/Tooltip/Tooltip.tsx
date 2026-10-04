'use client'

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

type TooltipProps = {
  // The element it describes — rendered as the trigger (keeps its own props and ref)
  children: React.ReactElement<Record<string, unknown>>
  label: React.ReactNode
}

// Short hover / keyboard-focus label for a control, e.g. an icon button's name.
// Not shown on touch — the control must make sense without it (use InfoTip for
// explanations people need to read).
const Tooltip = ({ children, label }: TooltipProps) => (
  <BaseTooltip.Root>
    <BaseTooltip.Trigger closeDelay={0} delay={400} render={children} />
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner className="z-60" collisionPadding={8} sideOffset={6}>
        <BaseTooltip.Popup className="rounded-control bg-ink text-caption shadow-float px-2 py-1 font-medium text-white transition-opacity duration-120 data-ending-style:opacity-0 data-starting-style:opacity-0">
          {label}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  </BaseTooltip.Root>
)

export default Tooltip
