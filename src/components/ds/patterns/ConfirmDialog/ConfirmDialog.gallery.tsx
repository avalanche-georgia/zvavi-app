'use client'

import { useState } from 'react'

import ConfirmDialog from './ConfirmDialog'
import type { ConfirmDialogTone } from './confirmDialogTones'
import { Button, DialogList } from '../../primitives'

const noop = () => undefined
const wait = (isFailing: boolean) =>
  new Promise((resolve, reject) => setTimeout(isFailing ? reject : resolve, 1500))

const moreLabel = (count: number) => `+${count} more`

const forecasts = [60, 58, 57, 55, 51, 49, 44].map((id) => (
  <>
    <a className="text-accent font-semibold hover:underline" href="#confirm-dialog">
      Forecast #{id}
    </a>
    <span className="text-copy-sm text-muted"> · 24 Sep 2026</span>
  </>
))

type DemoProps = {
  children?: React.ReactNode
  confirmLabel: string
  label: string
  onConfirm?: () => Promise<unknown> | void
  pendingLabel?: string
  title: string
  tone: ConfirmDialogTone
}

const Demo = ({
  children,
  confirmLabel,
  label,
  onConfirm = noop,
  pendingLabel,
  title,
  tone,
}: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        {label}
      </Button>
      <ConfirmDialog
        cancelLabel={tone === 'warning' ? 'Keep editing' : 'Cancel'}
        closeLabel="Close"
        confirmLabel={confirmLabel}
        isOpen={isOpen}
        onConfirm={onConfirm}
        onOpenChange={setIsOpen}
        pendingLabel={pendingLabel}
        title={title}
        tone={tone}
      >
        {children}
      </ConfirmDialog>
    </>
  )
}

const ConfirmDialogGallery = () => (
  <div className="flex flex-wrap gap-2">
    <Demo confirmLabel="Delete" label="danger + list" title="Delete A-0224" tone="danger">
      <p>The record is deleted permanently. This can’t be undone.</p>
      <p>
        Linked to <b className="font-semibold">7 forecasts</b>. They stay, without this avalanche:
      </p>
      <DialogList items={forecasts} moreLabel={moreLabel} />
    </Demo>
    <Demo confirmLabel="Discard" label="warning" title="Discard unsaved changes?" tone="warning">
      <p>Your unsaved changes will be lost.</p>
    </Demo>
    <Demo confirmLabel="Publish" label="info" title="Publish forecast #61" tone="info">
      <p>It goes live on the website and in partner apps right away.</p>
    </Demo>
    <Demo
      confirmLabel="Delete"
      label="pending, succeeds"
      onConfirm={() => wait(false)}
      pendingLabel="Deleting…"
      title="Delete forecast #180"
      tone="danger"
    >
      <p>The forecast is deleted permanently. This can’t be undone.</p>
    </Demo>
    <Demo
      confirmLabel="Delete"
      label="pending, fails"
      onConfirm={() => wait(true)}
      pendingLabel="Deleting…"
      title="Delete forecast #180"
      tone="danger"
    >
      <p>The forecast is deleted permanently. This can’t be undone.</p>
    </Demo>
    <Demo confirmLabel="Confirm" label="no body" title="Are you sure?" tone="info" />
  </div>
)

export default ConfirmDialogGallery
