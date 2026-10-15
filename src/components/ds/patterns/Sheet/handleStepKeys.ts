import type { SheetSteps } from './types'

// Keys these handle themselves: typing, and composite widgets that move with arrows
const arrowKeyOwnerSelector = [
  'input',
  'textarea',
  'select',
  '[role="grid"]',
  '[role="group"]',
  '[role="listbox"]',
  '[role="menu"]',
  '[role="radiogroup"]',
  '[role="slider"]',
  '[role="tablist"]',
  '[role="toolbar"]',
].join(', ')

// ←/→ step through the list. Ignored: browser shortcuts (Alt+← is Back), a held
// key, keys a control already handled, and anything while a layer is stacked on
// top (another sheet, a photo viewer) — portaled outside the popup, its keys
// still bubble here through React.
const handleStepKeys = (
  event: React.KeyboardEvent<HTMLElement>,
  steps: SheetSteps | null | undefined,
) => {
  if (!steps || event.defaultPrevented || event.repeat) return
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

  const popup = event.currentTarget
  const { target } = event

  if (!(target instanceof HTMLElement) || !popup.contains(target)) return
  if (popup.hasAttribute('data-nested-dialog-open')) return
  if (target.isContentEditable || target.closest(arrowKeyOwnerSelector)) return
  if (event.key === 'ArrowLeft' && steps.hasPrevious) steps.onPrevious()
  if (event.key === 'ArrowRight' && steps.hasNext) steps.onNext()
}

export default handleStepKeys
