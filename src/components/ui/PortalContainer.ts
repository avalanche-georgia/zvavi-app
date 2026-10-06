'use client'

import { createContext, useContext } from 'react'

// Where Radix popups (Select, Popover, Tooltip) portal to — document.body by
// default. A modal surface (Sheet) points it at itself: a popup portaled outside
// a base-ui modal dialog would fight its focus trap and count as an outside
// press. Rendered inside, it's part of the dialog.
const PortalContainerContext = createContext<HTMLElement | null>(null)

export const PortalContainerProvider = PortalContainerContext.Provider

export const usePortalContainer = () => useContext(PortalContainerContext) ?? undefined

// Esc closes only the topmost layer: a popup open inside a Sheet must not let
// the same keypress reach the Sheet and close it too
export const stopEscapePropagation = (event: KeyboardEvent) => event.stopPropagation()
