'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'

import Dialog from './Dialog'
import DialogList from './DialogList'
import { Button } from '../Button'

type DemoKind = 'busy' | 'list' | 'plain' | 'required' | 'titleOnly' | 'wide'

const demoKinds: { kind: DemoKind; label: string }[] = [
  { kind: 'plain', label: 'With body' },
  { kind: 'titleOnly', label: 'Title only' },
  { kind: 'list', label: 'With a list' },
  { kind: 'busy', label: 'Not dismissible (busy)' },
  { kind: 'wide', label: 'Wide' },
  { kind: 'required', label: 'Close disabled, wide (disclaimer)' },
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
    if (!isOpen && !isBusy) handleClose()
  }

  const footer = (
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
        closeLabel="Close"
        footer={footer}
        icon={icon}
        isDismissible={!isBusy}
        isOpen={openKind !== null && !isRequired}
        isWide={openKind === 'wide'}
        onOpenChange={handleOpenChange}
        title={openKind === 'list' ? 'Publish 7 forecasts' : 'Publish forecast #180'}
      >
        {(openKind === 'plain' || openKind === 'wide') && (
          <p>It becomes visible on the public site right away.</p>
        )}
        {openKind === 'list' && (
          <DialogList items={forecastLinks} moreLabel={(count) => `+${count} more`} />
        )}
        {isBusy && (
          <p>Backdrop, × and Esc do nothing until the action settles. Press Cancel to close.</p>
        )}
      </Dialog>
      <Dialog
        footer={<Button onClick={handleClose}>Continue</Button>}
        isCloseDisabled
        isOpen={isRequired}
        isWide
        title="Before you continue"
      >
        <p>Only Continue closes it: no ×, and the backdrop and Esc do nothing.</p>
      </Dialog>
    </div>
  )
}

export default DialogGallery
