'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'

import Dialog from './Dialog'
import DialogList from './DialogList'
import { Button } from '../Button'

type DemoKind = 'busy' | 'list' | 'plain' | 'required' | 'titleOnly'

const demoKinds: { kind: DemoKind; label: string }[] = [
  { kind: 'plain', label: 'With body' },
  { kind: 'titleOnly', label: 'Title only' },
  { kind: 'list', label: 'With a list' },
  { kind: 'busy', label: 'Not dismissible (busy)' },
  { kind: 'required', label: 'Required acknowledgement (no ×)' },
]

const forecastLinks = [
  '#180 · 12 Jan',
  '#179 · 11 Jan',
  '#178 · 10 Jan',
  '#177 · 9 Jan',
  '#176 · 8 Jan',
  '#175',
  '#174',
]

const icon = (
  <span className="rounded-control bg-accent-soft text-accent grid size-9 shrink-0 place-items-center">
    <Info aria-hidden className="size-5" />
  </span>
)

// The bare modal shell; ConfirmDialog (its only use) adds tones and async confirm
const DialogGallery = () => {
  const [openKind, setOpenKind] = useState<DemoKind | null>(null)
  const isBusy = openKind === 'busy'
  const isRequired = openKind === 'required'

  const handleClose = () => setOpenKind(null)

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !isBusy && !isRequired) handleClose()
  }

  const footer = isRequired ? (
    <Button onClick={handleClose}>Continue</Button>
  ) : (
    <>
      <Button onClick={handleClose} variant="secondary">
        Cancel
      </Button>
      <Button isBusy={isBusy} onClick={handleClose}>
        {isBusy ? 'Publishing…' : 'Publish'}
      </Button>
    </>
  )

  return (
    <div className="flex flex-wrap gap-2">
      {demoKinds.map(({ kind, label }) => (
        <Button key={kind} onClick={() => setOpenKind(kind)} size="sm" variant="secondary">
          {label}
        </Button>
      ))}
      <Dialog
        closeLabel={isRequired ? undefined : 'Close'}
        footer={footer}
        icon={icon}
        isDismissible={!isBusy && !isRequired}
        isOpen={openKind !== null}
        onOpenChange={handleOpenChange}
        title={openKind === 'list' ? 'Publish 7 forecasts' : 'Publish forecast #180'}
      >
        {openKind === 'plain' && <p>It becomes visible on the public site right away.</p>}
        {openKind === 'list' && (
          <DialogList items={forecastLinks} moreLabel={(count) => `+${count} more`} />
        )}
        {isRequired && <p>Only Continue closes it: no ×, backdrop or Esc.</p>}
        {isBusy && (
          <p>Backdrop, × and Esc do nothing until the action settles. Press Cancel to close.</p>
        )}
      </Dialog>
    </div>
  )
}

export default DialogGallery
