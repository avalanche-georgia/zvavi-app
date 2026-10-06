'use client'

import { useState } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

import { usePortalContainer } from '../PortalContainer'

import { cn } from '@/lib/utils'

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
}: TooltipContentProps) => {
  const portalContainer = usePortalContainer()

  return (
    <TooltipPrimitive.Portal container={portalContainer}>
      <TooltipPrimitive.Content
        className={cn(
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
}

type TooltipProps = {
  children: ReactNode
  content: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = ({ children, content, side = 'top' }: TooltipProps) => {
  // Radix's tooltip only opens on hover/focus, which never fires on touch —
  // controlled open state + a click toggle makes it work on mobile too,
  // while hover (via onOpenChange) still works on desktop.
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TooltipPrimitive.Root onOpenChange={setIsOpen} open={isOpen}>
      <TooltipPrimitive.Trigger asChild onClick={() => setIsOpen((prev) => !prev)}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipPrimitive.Root>
  )
}

export { Tooltip, TooltipProvider }
