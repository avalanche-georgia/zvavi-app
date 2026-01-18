'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import type { ReactNode } from 'react'

const TooltipProvider = TooltipPrimitive.Provider

type TooltipContentProps = {
  children: ReactNode
  className?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

const TooltipContent = ({
  children,
  className,
  side = 'top',
  sideOffset = 4,
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      className={clsx(
        'z-50 rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md',
        'data-[state=closed]:animate-tooltip-out data-[state=delayed-open]:animate-tooltip-in',
        className,
      )}
      side={side}
      sideOffset={sideOffset}
    >
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
)

type TooltipProps = {
  asChild?: boolean
  children: ReactNode
  content: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = ({ asChild = false, children, content, side = 'top' }: TooltipProps) => (
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger asChild={asChild}>
      {asChild ? children : <span>{children}</span>}
    </TooltipPrimitive.Trigger>
    <TooltipContent side={side}>{content}</TooltipContent>
  </TooltipPrimitive.Root>
)

export { Tooltip, TooltipProvider }
